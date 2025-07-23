// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  portfolio: String,
  coverLetter: { type: String, required: true },
  linkedinProfile: String,
  currentSalary: String,
  expectedSalary: String,
  availableDate: String,
  workPreference: String,
  resumePath: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
