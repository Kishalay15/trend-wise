import { GoogleGenerativeAI } from "@google/generative-ai";
import slugify from "slugify";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateArticleFromTopic(topic) {
  if (typeof topic !== "string") {
    logger.warn(`Expected topic to be a string but got: ${typeof topic}`);
    topic = String(topic);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
Write a complete SEO-optimized blog post about: "${topic}"

Include the following:
- A catchy blog title
- A compelling meta description
- Structured headers (H1, H2, H3)
- 2–3 image or tweet embed suggestions (just mention them)
Ensure the content is formatted as markdown or HTML.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const articleText = response.text();
    const titleMatch = articleText.match(/^# (.+)$/m);
    const metaMatch = articleText.match(/meta description:(.+)/i);

    return {
      title: titleMatch ? titleMatch[1].trim() : topic,
      slug: slugify(String(topic).toLowerCase()),
      metaDesc: metaMatch ? metaMatch[1].trim() : `A deep dive into ${topic}`,
      content: articleText,
      media: [],
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate article content");
  }
}
