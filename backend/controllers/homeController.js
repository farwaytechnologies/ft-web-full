const HomeSection = require('../models/HomeSection');

// GET home section content
exports.getHomeContent = async (req, res) => {
  try {
    const content = await HomeSection.findOne(); // assuming one entry
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching home content', error });
  }
};

// POST or update home section content
exports.updateHomeContent = async (req, res) => {
  try {
    const existing = await HomeSection.findOne();
    const contentData = {
      heading: req.body.heading,
      description: req.body.description,
      videoUrl: req.body.videoUrl,
      buttonText: req.body.buttonText,
      buttonLink: req.body.buttonLink
    };

    let updated;
    if (existing) {
      updated = await HomeSection.findByIdAndUpdate(existing._id, contentData, { new: true });
    } else {
      updated = await HomeSection.create(contentData);
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating home content', error });
  }
};
