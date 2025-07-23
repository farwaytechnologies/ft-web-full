const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes')); // ✅ Blog API route
app.use('/api/about', require('./routes/aboutRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('🚀 API running...');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(500).json({ error: 'Server error' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
