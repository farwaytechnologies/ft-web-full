const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/studentController');
const protect = require('../middleware/studentAuth');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/profile', protect, ctrl.getProfile);

module.exports = router;
