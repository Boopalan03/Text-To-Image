import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import Routes
import authRouter from "./routes/authRoute.js";
import generateRouter from "./routes/generateRoute.js";

// Load Env Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));

// CORS - Allow Frontend Access (Fixes Network Error)
app.use(cors({
  origin: "*", // Temporarily allow all for dev (or use ["http://localhost:5173"])
  credentials: true
}));

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Routes
app.use("/api/auth", authRouter);          // Login & Register
app.use("/api/generate-image", generateRouter); // Image Generation

// Health Check
app.get("/", (req, res) => {
  res.json({ status: "active", message: "API is running" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ success: false, error: err.message || "Server Error" });
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
