import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- Middlewares ---
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// --- API Routes ---
app.get("/", (req, res) => {
  res.send("BookIt API is running...");
});
app.use("/api/v1", apiRoutes);

// --- Export the app ---
// Vercel will use this to create a serverless function
export default app;