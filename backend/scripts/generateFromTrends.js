import "dotenv/config";
import mongoose from "mongoose";
import puppeteer from "puppeteer";
import { generateArticleFromTopic } from "../utils/generateArticle.js";
import Article from "../models/Article.js";
import logger from "../utils/logger.js";
import { load } from "cheerio";

export async function getTrendingTopic() {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(
      "https://trends.google.com/trends/trendingsearches/daily?geo=IN",
      {
        waitUntil: "networkidle2",
        timeout: 60000,
      }
    );

    // Wait for the element to appear
    await page.waitForSelector("div.mZ3RIc", { timeout: 20000 });

    // Extract the text content of the first topic
    const topic = await page.evaluate(() => {
      const topicElement = document.querySelector("div.mZ3RIc");
      return topicElement?.textContent?.trim() || null;
    });

    await browser.close();

    if (!topic) throw new Error("No trending topic found in .mZ3RIc");

    return topic;
  } catch (error) {
    logger.error(
      `Error fetching trending topic with Puppeteer: ${error.message}`
    );
    return null;
  }
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB");

    const topic = await getTrendingTopic();
    if (!topic) throw new Error("No trending topic found.");

    logger.info(`Trending Topic: "${topic}"`);

    const articleData = await generateArticleFromTopic(topic);
    const exists = await Article.findOne({ slug: articleData.slug });

    if (exists) {
      logger.warn(`Article already exists: ${articleData.slug}`);
      return;
    }

    const newArticle = new Article(articleData);
    await newArticle.save();
    logger.info(`New article saved: ${articleData.slug}`);
  } catch (err) {
    logger.error(`Script error: ${err.message}`);
  } finally {
    await mongoose.connection.close();
    logger.info("Disconnected from MongoDB");
  }
}

main();
