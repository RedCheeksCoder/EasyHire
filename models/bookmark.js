import { Schema, model, models } from "mongoose";

const BookmarkSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bookmark: {
    type: Array,
    required: [true, "Bookmark is required."],
  },
});

const Bookmark = models.Bookmark || model("Bookmark", BookmarkSchema);

export default Bookmark;
