import Comment from "../models/Comment.js";
import logger from "../utils/logger.js";

export const createComment = async (articleSlug, userEmail, commentText) => {
  if (!articleSlug || !userEmail || !commentText) {
    throw new Error(
      "All fields are required: articleSlug, userEmail, commentText"
    );
  }

  const comment = new Comment({ articleSlug, userEmail, commentText });

  return await comment.save();
};

export const getCommentsBySlug = async (slug) => {
  if (!slug) throw new Error("Missing required query parameter: slug");

  const comments = await Comment.find({ articleSlug: slug }).sort({
    timestamp: -1,
  });

  return comments || [];
};
