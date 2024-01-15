import JobPost from "@models/jobpost";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const jobPost = await JobPost.find({}).populate("creator");

    return new Response(JSON.stringify(jobPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch job posts", { status: 500 });
  }
};
