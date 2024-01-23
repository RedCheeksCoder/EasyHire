import Feed from "@components/Feed";
import "@styles/globals.css";
import { useRouter } from "next/router";
import { useState } from "react";

export const metadata = {
  title: "EasyHire",
  description: "Simplifying Job search and connecting people",
};

function Home() {
  const [displayJobPost, setDisplayJobPost] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setDisplayJobPost((prev) => !prev);
  }, [router.pathname]);
  return (
    <section className="section_setup">
      <h1 className="head_text text-center">
        <span className="blue_gradient ">
          Simplifying <span>Job Search</span>
        </span>{" "}
        <br />
        Connecting people
      </h1>
      <p className="description text-center text-balance">
        Connecting job seekers with employers seamlessly. Simplifying job search
        and connection experience.
      </p>
      <Feed displayJobPost={displayJobPost} />
    </section>
  );
}

export default Home;
