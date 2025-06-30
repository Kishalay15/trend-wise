import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  articleSlug: { type: String, required: true },
  userEmail: { type: String, required: true },
  commentText: { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", CommentSchema);
