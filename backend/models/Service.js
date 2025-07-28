const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String, required: true },
  video: { type: String } // Optional video URL
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
