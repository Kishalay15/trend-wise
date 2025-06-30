import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed: " + error.message);

    process.exit(1);
  }
};
