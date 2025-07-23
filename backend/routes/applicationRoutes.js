// routes/applicationRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  submitApplication,
  getAllApplications,
  deleteApplication,
} = require('../controllers/applicationController');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowed = ['.pdf', '.doc', '.docx'];
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only PDF, DOC, DOCX files are allowed'));
  },
});

// Routes
router.post('/', upload.single('resume'), submitApplication);
router.get('/', getAllApplications);
router.delete('/:id', deleteApplication);

module.exports = router;
