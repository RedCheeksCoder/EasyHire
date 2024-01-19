import Bookmark from "@models/bookmark";
import { connectToDB } from "@utils/database";
export const POST = async (request) => {
  const { userId, bookmark } = await request.json();

  try {
    await connectToDB();
    const newBookmark = new Bookmark({ creator: userId, bookmark });

    await newBookmark.save();
    return new Response(JSON.stringify(newBookmark), { status: 201 });
  } catch (error) {
    return new Response("Failed to create add new bookmark", { status: 500 });
  }
};
