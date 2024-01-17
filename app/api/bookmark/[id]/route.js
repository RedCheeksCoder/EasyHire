import Bookmark from "@models/bookmark";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const bookmark = await Bookmark.findById(params.id);
    if (!bookmark) return new Response("Bookmark not found", { status: 404 });

    return new Response(JSON.stringify(bookmark), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
