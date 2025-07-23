// models/About.js
const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  mission: String,
  vision: String,
  reasons: [String], // Array of bullet points
});

module.exports = mongoose.model('About', AboutSchema);
