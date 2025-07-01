import "dotenv/config";
import mongoose from "mongoose";
import puppeteer from "puppeteer";
import { generateArticleFromTopic } from "../utils/generateArticle.js";
import Article from "../models/Article.js";
import logger from "../utils/logger.js";

export async function getTrendingTopic() {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      // executablePath: process.env.CHROMIUM_PATH,
      executablePath: puppeteer.executablePath(),
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

    await page.waitForSelector("div.mZ3RIc", { timeout: 20000 });

    const topics = await page.evaluate(() => {
      const topicElements = Array.from(document.querySelectorAll("div.mZ3RIc"));
      // return topicElement?.textContent?.trim() || null;
      return topicElements.map((el) => el.textContent.trim()).filter(Boolean);
    });

    await browser.close();

    if (!topics.length) throw new Error("No trending topics found");

    return topics;
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

    const topics = await getTrendingTopic();
    if (!topics) throw new Error("No trending topics retrieved.");

    for (const topic of topics) {
      const slug = topic.toLowerCase().replace(/\s+/g, "-");
      const exists = await Article.findOne({ slug });

      if (!exists) {
        logger.info(`Selected Topic: "${topic}"`);

        const articleData = await generateArticleFromTopic(topic);
        const newArticle = new Article(articleData);
        await newArticle.save();
        logger.info(`New article saved: ${articleData.slug}`);

        return;
      } else {
        logger.info(`Skipping already existing topic: ${topic}`);
      }
    }

    logger.warn("No new trending topics available to generate article.");
  } catch (err) {
    logger.error(`Script error: ${err.message}`);
  }
}

main();
