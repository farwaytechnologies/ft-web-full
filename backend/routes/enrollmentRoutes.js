const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/enrollmentController');

router.get('/student/:email', ctrl.getMyEnrollments);
router.get('/', ctrl.getAllEnrollments);
router.post('/', ctrl.enroll);
router.patch('/:enrollmentId/lesson/:lessonId', ctrl.toggleLesson);
router.delete('/:id', ctrl.deleteEnrollment);

module.exports = router;
