import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";
import articleRoutes from "./routes/articles.js";
import commentRoutes from "./routes/comments.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
