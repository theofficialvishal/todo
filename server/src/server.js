const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware configuration
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Root test / ping endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TodoApp REST API is running successfully'
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`[Server] TodoApp backend server running on http://localhost:${PORT}`);
});
