import JobPost from "@models/jobpost";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const jobPost = await JobPost.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(jobPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all job posts", { status: 500 });
  }
};
