// routes/jobRoleRoutes.js
const express = require('express');
const router = express.Router();
const jobRoleController = require('../controllers/jobRoleController');

// Admin access (you can add middleware later for auth)
router.get('/', jobRoleController.getAllJobRoles);
router.post('/', jobRoleController.createJobRole);
router.delete('/:id', jobRoleController.deleteJobRole);

module.exports = router;
