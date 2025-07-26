const mongoose = require('mongoose');

const homeSectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true }
});

module.exports = mongoose.model('HomeSection', homeSectionSchema);
