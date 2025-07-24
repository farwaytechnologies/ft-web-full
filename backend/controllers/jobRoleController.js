// controllers/jobRoleController.js
const JobRole = require('../models/JobRole');

// Get all job roles
exports.getAllJobRoles = async (req, res) => {
  try {
    const roles = await JobRole.find().sort({ createdAt: -1 });
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new job role
exports.createJobRole = async (req, res) => {
  try {
    const newRole = new JobRole(req.body);
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job role
exports.deleteJobRole = async (req, res) => {
  try {
    await JobRole.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job role deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
