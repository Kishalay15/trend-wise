import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    metaDesc: { type: String, trim: true },
    content: { type: String, required: true },
    media: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Article", ArticleSchema);
