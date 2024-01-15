import { Schema, model, models } from "mongoose";

const JobPostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  post: {
    type: String,
    required: [true, "Details are required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const JobPost = models.JobPost || model("JobPost", JobPostSchema);

export default JobPost;
