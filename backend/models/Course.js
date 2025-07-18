const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // renamed from 'name'
  description: { type: String, required: true },
  image: { type: String, required: true },
  detailedDescription: { type: String },
  modules: [
    {
      title: String,
      content: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
