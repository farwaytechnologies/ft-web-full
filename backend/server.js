const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// ✅ ADD THIS LINE
app.use('/api/admin', require('./routes/adminRoutes'));

// Contact route
app.use('/api/contact', require('./routes/contactRoutes'));


app.use('/api/services', require('./routes/serviceRoutes'));


// Root route
app.get('/', (req, res) => {
  res.send('API running...');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
