import Bookmark from "@models/bookmark";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const bookmark = await Bookmark.findById(params.id).populate("creator");
    if (!bookmark) return new Response("Bookmark not found", { status: 404 });

    return new Response(JSON.stringify(bookmark), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
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

export const PATCH = async (request) => {
  const { userId, bookmark } = await request.json();

  try {
    await connectToDB();

    // Find the existing job post by ID
    const existingBookmark = await Bookmark.findById(userId);

    if (!existingBookmark) {
      return new Response("Bookmark not found", { status: 404 });
    }

    // Update the prompt with new data
    existingBookmark.bookmark = bookmark;

    await existingBookmark.save();

    return new Response("Successfully updated the Job Posts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Job Posts", { status: 500 });
  }
};
