import JobPost from "@models/jobpost";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const jobPost = await JobPost.findById(params.id).populate("creator");
    if (!jobPost) return new Response("Job Post Not Found", { status: 404 });

    return new Response(JSON.stringify(jobPost), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, post, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing job post by ID
    const existingJobPost = await JobPost.findById(params.id);

    if (!existingJobPost) {
      return new Response("Job Post not found", { status: 404 });
    }

    // Update the prompt with new data
    existingJobPost.title = title;
    existingJobPost.post = post;
    existingJobPost.tag = tag;

    await existingJobPost.save();

    return new Response("Successfully updated the Job Posts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Job Posts", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await JobPost.findByIdAndRemove(params.id);

    return new Response("Job Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Job Post", { status: 500 });
  }
};
