import express from "express";
import { generateArticleFromTopic } from "../utils/generateArticle.js";
import Article from "../models/Article.js";
import logger from "../utils/logger.js";
import { getTrendingTopic } from "../scripts/generateFromTrends.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const userEmail = req.headers["x-user-email"];
  if (userEmail !== "lahirikishalay@gmail.com") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const topic = await getTrendingTopic();
    if (!topic) return res.status(400).json({ error: "No trending topic" });

    const articleData = await generateArticleFromTopic(topic);
    const exists = await Article.findOne({ slug: articleData.slug });
    if (exists)
      return res.status(409).json({ message: "Article already exists" });

    const newArticle = new Article(articleData);
    await newArticle.save();

    logger.info(`Admin-triggered: New article saved: ${articleData.slug}`);
    res.json({ message: "Article generated", slug: articleData.slug });
  } catch (err) {
    logger.error(`Admin-triggered error: ${err.message}`);
    res.status(500).json({ error: "Generation failed" });
  }
});

export default router;
