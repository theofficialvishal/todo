const mongoose = require('mongoose');

/**
 * Connect to MongoDB instance using Mongoose ODM
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db';
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
