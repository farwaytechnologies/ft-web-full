const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder to serve uploaded files (e.g. resumes, images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// ✅ New: Job Roles Routes
app.use('/api/jobroles', require('./routes/jobRoleRoutes')); // <-- NEW ROUTE

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 API running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(500).json({ error: 'Server error' });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
