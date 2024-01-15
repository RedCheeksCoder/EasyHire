"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditJobPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobpostId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [jobPost, setJobPost] = useState({
    title: "",
    post: "",
    tag: "",
  });

  useEffect(() => {
    const getJobPostDetails = async () => {
      const response = await fetch(`/api/jobPost/${jobpostId}`);
      const data = await response.json();
      console.log(data);
      setJobPost({
        title: data.title,
        post: data.post,
        tag: data.tag,
      });
    };

    if (jobpostId) getJobPostDetails();
  }, [jobpostId]);

  const editJobPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!jobpostId) return alert("Job post ID not found");
    try {
      const response = await fetch(`/api/jobPost/${jobpostId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: jobPost.title,
          post: jobPost.post,
          tag: jobPost.tag,
        }),
      });
      console.log(response);

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
      type="Edit"
      jobPost={jobPost}
      setJobPost={setJobPost}
      submitting={submitting}
      handleSubmit={editJobPost}
    />
  );
};

export default EditJobPost;
