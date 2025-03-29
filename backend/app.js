const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');
const helmet = require('helmet');

dotenv.config();

const app = express();

// CORS
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use(helmet());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Online' });
});

module.exports = app;