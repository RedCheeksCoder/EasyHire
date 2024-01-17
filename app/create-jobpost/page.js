"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateJobPost = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [jobPost, setJobPost] = useState({
    title: "",
    post: "",
    tag: "",
  });

  const createJobPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/jobPost/new", {
        method: "POST",
        body: JSON.stringify({
          title: jobPost.title,
          post: jobPost.post,
          userId: session?.user.id,
          tag: jobPost.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      jobPost={jobPost}
      setJobPost={setJobPost}
      submitting={submitting}
      handleSubmit={createJobPost}
    />
  );
};

export default CreateJobPost;
