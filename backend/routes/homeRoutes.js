const express = require('express');
const router = express.Router();
const { getHomeContent, updateHomeContent } = require('../controllers/homeController');

// GET home section
router.get('/', getHomeContent);

// POST or PUT home section (admin use)
router.post('/', updateHomeContent);

module.exports = router;
