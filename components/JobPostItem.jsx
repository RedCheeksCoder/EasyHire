"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const JobPostItem = ({ jobPost, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copyEmail, setCopyEmail] = useState("");

  /* Profile Click */
  const handleProfileClick = () => {
    if (jobPost.creator?._id === session?.user.id)
      return router.push("/profile");

    router.push(
      `/profile/${jobPost.creator?._id}?name=${jobPost.creator?.username}`
    );
  };

  const handleSendEmail = () => {
    console.log("Meowth");
    setCopyEmail(jobPost.creator?.email);
    navigator.clipboard.writeText(jobPost.creator?.email);
    setTimeout(() => {
      setCopyEmail(false);
      alert("Redirecting to google mail");
      window.open(
        "https://mail.google.com/mail/u/0/#inbox?compose=new",
        "_blank"
      );
    }, 1500);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}>
          <Image
            src={jobPost.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {jobPost.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {session ? jobPost.creator?.email : "*************"}
            </p>
          </div>
        </div>
        {session ? (
          <div className="copy_btn" onClick={handleSendEmail}>
            <Image
              src={
                copyEmail === jobPost.creator?.email
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={"Email the hiring team"}
              width={15}
              height={15}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="text-lg my-2 font-satoshi font-bold">
        Looking for {jobPost?.title}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700 whitespace-pre-wrap text">
        {jobPost?.post}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(jobPost?.tag)}>
        {jobPost?.tag}
      </p>

      {session?.user.id === jobPost.creator?._id && pathName === "/profile" && (
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
