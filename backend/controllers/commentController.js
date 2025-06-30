import * as CommentService from "../services/commentService.js";
import logger from "../utils/logger.js";

export const postComment = async (req, res) => {
  try {
    const { articleSlug, userEmail, commentText } = req.body;
    logger.info(`User ${userEmail} commenting on ${articleSlug}`);
    const comment = await CommentService.createComment(
      articleSlug,
      userEmail,
      commentText
    );

    res.status(201).json(comment);
  } catch (error) {
    logger.error(`Comment post failed: ${error.message}`);

    res.status(400).json({ error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { slug } = req.query;
    const comments = await CommentService.getCommentsBySlug(slug);

    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
