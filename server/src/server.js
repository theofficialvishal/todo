const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Connect to MongoDB
connectDB().catch(err => {
  console.error('[Server Startup Warning] Initial MongoDB connection failed. Retrying on operations.');
});

// Middleware configuration
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Root ping endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TodoApp REST API is running successfully'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    success: true,
    status: 'OK',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Centralized error handling middleware
app.use(errorHandler);

// Start Express server
app.listen(PORT, () => {
  console.log(`[Server] TodoApp backend server running on http://localhost:${PORT}`);
});
