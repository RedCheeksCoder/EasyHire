"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const JobPostItem = ({ jobPost, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const [bookmark, setBookmark] = useState();
  const pathName = usePathname();
  const router = useRouter();
  const handleProfileClick = () => {
    if (jobPost.creator._id === session?.user.id)
      return router.push("/profile");

    router.push(
      `/profile/${jobPost.creator._id}?name=${jobPost.creator.username}`
    );
  };

  const handleBookMark = () => {
    setBookmark(jobPost._id);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}>
          <Image
            src={jobPost.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {jobPost.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {jobPost.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleBookMark}>
          <Image
            src={
              bookmark
                ? "/assets/icons/bookmark.svg"
                : "/assets/icons/bookmark-filled.svg"
            }
            alt={"Job Post"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="text-lg my-2 font-satoshi font-bold">
        Looking for {jobPost.title}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700 whitespace-pre-wrap">
        {jobPost.post}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(jobPost.tag)}>
        {jobPost.tag}
      </p>

      {session?.user.id === jobPost.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex_center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm text-blue-500 cursor-pointer"
            onClick={handleEdit}>
            Edit
          </p>
          <p
            className="font-inter text-sm text-black cursor-pointer"
            onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default JobPostItem;
