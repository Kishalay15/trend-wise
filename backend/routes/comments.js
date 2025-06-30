import express from "express";
import { getComments, postComment } from "../controllers/commentController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    body("articleSlug")
      .trim()
      .notEmpty()
      .withMessage("Article slug is required"),
    body("userEmail").isEmail().withMessage("Valid email is required"),
    body("commentText")
      .trim()
      .notEmpty()
      .withMessage("Comment text cannot be empty"),
  ],
  validateRequest,
  postComment
);
router.get("/", getComments);

export default router;
