import Article from "../models/Article.js";
import { generateArticleFromTopic } from "../utils/generateArticle.js";

export const createArticle = async (topic) => {
  if (!topic || topic.length < 5) {
    throw new Error("Topic is too short or missing");
  }

  const articleData = await generateArticleFromTopic(topic);
  const article = new Article(articleData);

  await article.save();

  return article;
};

export const getArticles = async () => {
  return await Article.find().sort({ createdAt: -1 });
};

export const getArticleBySlug = async (slug) => {
  if (!slug) throw new Error("Missing article slug");

  const article = await Article.findOne({ slug });
  if (!article) throw new Error("Article not found");

  return article;
};
