const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db");
const analyticsRoutes = require("./routes/analytics");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
})); // ✅ Apply CORS before routes

app.use(express.json());
app.use("/api/analytics", analyticsRoutes);

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.error("MongoDB connection error:", err));

connectDB();
