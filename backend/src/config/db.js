const mongoose = require('mongoose');

/**
 * Connects to MongoDB using MONGODB_URI from the environment (loaded via dotenv
 * in server.js). The connection string itself is never logged or hardcoded here.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set in the environment (.env)');
  }

  await mongoose.connect(uri);

  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}

module.exports = connectDB;
