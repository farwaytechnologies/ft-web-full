const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String },
  duration: { type: String }, // e.g. "12:30"
  order: { type: Number, default: 0 },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  detailedDescription: { type: String },
  category: { type: String, default: 'General' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  duration: { type: String }, // e.g. "6 hours"
  modules: [{ title: String, content: String }], // kept for backward compat
  lessons: [lessonSchema],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
