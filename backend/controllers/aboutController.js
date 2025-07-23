// controllers/aboutController.js
const About = require('../models/About');

exports.getAboutData = async (req, res) => {
  try {
    const aboutData = await About.findOne(); // Fetch first available document
    res.status(200).json(aboutData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch about data.' });
  }
};

exports.updateAboutData = async (req, res) => {
  try {
    const updated = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update about data.' });
  }
};
