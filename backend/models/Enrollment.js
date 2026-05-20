const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
  enrolledAt: { type: Date, default: Date.now },
});

// One enrollment per email per course
enrollmentSchema.index({ studentEmail: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
