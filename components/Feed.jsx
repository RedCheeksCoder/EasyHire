"use client";

import { useState, useEffect } from "react";

import JobPostItem from "./JobPostItem";
import { useRouter } from "next/navigation";

const JobPosts = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((jobPost) => (
        <JobPostItem
          key={jobPost._id}
          jobPost={jobPost}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allJobPosts, setAllJobPosts] = useState([]);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const router = useRouter();
  const fetchJobPosts = async () => {
    const response = await fetch("/api/jobPost");
    const data = await response.json();

    setAllJobPosts(data);
  };
  useEffect(() => {
    fetchJobPosts();

    const handleRouteChange = (url) => {
      if (url === "/") {
        fetchJobPosts();
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  const filterJobPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allJobPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterJobPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterJobPosts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex_center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* All Prompts */}
      {searchText ? (
        <JobPosts data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <JobPosts data={allJobPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
