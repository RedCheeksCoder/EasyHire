import JobPost from "@models/jobpost";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { title, userId, post, tag } = await request.json();

  try {
    await connectToDB();
    const newJobPost = new JobPost({ creator: userId, title, post, tag });

    await newJobPost.save();
    return new Response(JSON.stringify(newJobPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new job post", { status: 500 });
  }
};
