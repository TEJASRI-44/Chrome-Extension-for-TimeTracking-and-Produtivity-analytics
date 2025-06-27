const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  timeSpent: { type: Number, default: 0 },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  userId: { type: String, required: true }
});

// Avoid OverwriteModelError when reloading the server
module.exports = mongoose.models.SiteData || mongoose.model("SiteData", siteSchema);
