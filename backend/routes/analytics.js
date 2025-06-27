const express = require("express");
const router = express.Router();
const SiteData = require("../models/userData");

// Save time data
router.post("/log", async (req, res) => {
  const { domain, timeSpent, date, userId } = req.body;
  console.log("📥 Logging:", req.body);

  try {
    await SiteData.updateOne(
      { domain, date, userId },
      { $inc: { timeSpent } },
      { upsert: true }
    );
    res.status(200).json({ message: "Logged successfully" });
  } catch (err) {
    console.error("Log error:", err);
    res.status(500).json({ error: "Failed to log data" });
  }
});

// Return last 7 days of data
router.get("/weekly/:userId", async (req, res) => {
  const { userId } = req.params;

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);
  const startDate = weekAgo.toISOString().slice(0, 10); // e.g., "2025-06-20"

  try {
    const data = await SiteData.find({
      userId,
      date: { $gte: startDate }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weekly data" });
  }
});

module.exports = router;
