// controllers/applicationController.js
const Application = require('../models/Application');
const fs = require('fs');
const path = require('path');

// Submit application
exports.submitApplication = async (req, res) => {
  try {
    const data = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!resumePath) {
      return res.status(400).json({ error: 'Resume file is required.' });
    }

    const newApplication = new Application({
      ...data,
      resumePath,
    });

    await newApplication.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Application submission error:', err.message);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Delete resume file
    if (application.resumePath) {
      fs.unlink(path.join(__dirname, '..', application.resumePath), (err) => {
        if (err) console.warn('Resume deletion failed:', err.message);
      });
    }

    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};
