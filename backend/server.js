// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., uploaded images, resumes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/jobroles', require('./routes/jobRoleRoutes'));
app.use('/api/home', require('./routes/homeRoutes')); // ✅ Added HomeMainSection backend route

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 API running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
