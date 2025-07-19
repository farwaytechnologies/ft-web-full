const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  heroImage: { type: String },
  about: { type: String },
  system: { type: String },
  language: { type: String },
  launchDate: { type: String },
  link: { type: String },

  services: [{ type: String }],

  gallery: [
    {
      type: { type: String, enum: ['image', 'video'], required: true },
      src: { type: String, required: true }
    }
  ],

  challenges: [
    {
      title: String,
      description: String
    }
  ],

  solutions: [
    {
      title: String,
      description: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
