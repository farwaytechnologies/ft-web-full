const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Enroll in a course
exports.enroll = async (req, res) => {
  try {
    const { studentName, studentEmail, courseId } = req.body;
    if (!studentName || !studentEmail || !courseId)
      return res.status(400).json({ error: 'Name, email and courseId are required' });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const existing = await Enrollment.findOne({ studentEmail, course: courseId });
    if (existing) return res.status(409).json({ error: 'Already enrolled', enrollment: existing });

    const enrollment = await Enrollment.create({ studentName, studentEmail, course: courseId });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all enrollments for an email
exports.getMyEnrollments = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const enrollments = await Enrollment.find({ studentEmail: email }).populate('course');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark a lesson complete / incomplete
exports.toggleLesson = async (req, res) => {
  try {
    const { enrollmentId, lessonId } = req.params;
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });

    const idx = enrollment.completedLessons.findIndex(id => id.toString() === lessonId);
    if (idx === -1) {
      enrollment.completedLessons.push(lessonId);
    } else {
      enrollment.completedLessons.splice(idx, 1);
    }
    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all enrollments (admin)
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('course', 'title').sort({ enrolledAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete enrollment (admin)
exports.deleteEnrollment = async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enrollment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
