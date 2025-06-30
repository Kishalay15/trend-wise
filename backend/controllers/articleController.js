import * as ArticleService from "../services/articleService.js";
import logger from "../utils/logger.js";

export const createArticle = async (req, res) => {
  try {
    const { topic } = req.body;
    logger.info(`Creating article for topic: ${topic}`);
    const article = await ArticleService.createArticle(topic);

    res.status(201).json(article);
  } catch (error) {
    logger.error(`Article creation failed: ${error.message}`);

    res.status(400).json({ error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await ArticleService.getArticles();

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles." });
  }
};

export const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await ArticleService.getArticleBySlug(slug);

    res.json(article);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
