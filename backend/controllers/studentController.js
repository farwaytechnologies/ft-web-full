const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

const sign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'lms_secret_key', { expiresIn: '30d' });

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    const exists = await Student.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });

    const student = await Student.create({ name, email, password });
    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      token: sign(student._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    const student = await Student.findOne({ email });
    if (!student || !(await student.matchPassword(password)))
      return res.status(401).json({ error: 'Invalid email or password' });

    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      token: sign(student._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get profile (protected)
exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId).select('-password');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
