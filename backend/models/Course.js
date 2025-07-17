const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true }, // e.g., /courses/full-stack-web-development
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL or filename
  detailedDescription: { type: String },
  modules: [{ 
    title: String,
    content: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
