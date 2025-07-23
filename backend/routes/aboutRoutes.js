// routes/aboutRoutes.js
const express = require('express');
const router = express.Router();
const { getAboutData, updateAboutData } = require('../controllers/aboutController');

router.get('/', getAboutData);
router.put('/', updateAboutData); // for admin editing

module.exports = router;
