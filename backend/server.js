import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDatabase from "./config/db.js";
import greetingRoutes from "./routes/greetingRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173"
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "5mb" }));

app.get("/", (_req, res) => {
  res.json({ message: "Custom Greetings & Wishes API is running." });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "online",
    database: mongoose.connection.readyState === 1 ? "connected" : "not connected",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/greetings", greetingRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

connectDatabase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
