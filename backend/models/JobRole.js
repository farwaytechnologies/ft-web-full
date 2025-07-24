// models/JobRole.js
const mongoose = require('mongoose');

const JobRoleSchema = new mongoose.Schema({
  title: String,
  department: String,
  location: String,
  type: String,
  experience: String,
  description: String,
  requirements: [String]
}, { timestamps: true });

module.exports = mongoose.model('JobRole', JobRoleSchema);
