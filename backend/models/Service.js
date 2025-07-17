const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },            // Short description
  detailedDescription: { type: String, required: true },    // Full detailed description
  features: [{ type: String }],                             // Optional features list
  image: { type: String, required: true },                  // Main image (URL or filename)
  video: { type: String }                                   // Optional: YouTube or other video URL
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
