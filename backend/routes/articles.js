import express from "express";
import {
  createArticle,
  getArticleBySlug,
  getArticles,
} from "../controllers/articleController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    body("topic")
      .trim()
      .notEmpty()
      .withMessage("Topic is required")
      .isLength({ min: 5 })
      .withMessage("Topic should be at least 5 characters long"),
  ],
  validateRequest,
  createArticle
);
router.get("/", getArticles);
router.get("/:slug", getArticleBySlug);

export default router;
