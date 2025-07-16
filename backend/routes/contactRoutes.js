const express = require('express');
const router = express.Router();
const {
  submitMessage,
  getAllMessages,
  deleteMessage,
} = require('../controllers/contactController');

router.post('/submit', submitMessage);
router.get('/all', getAllMessages);
router.delete('/:id', deleteMessage);

module.exports = router;
