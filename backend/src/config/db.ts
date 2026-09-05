import mongoose from 'mongoose';

/**
 * Connects to MongoDB using MONGODB_URI from the environment (loaded via dotenv
 * in server.ts). The connection string itself is never logged or hardcoded here.
 */
async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set in the environment (.env)');
  }

  await mongoose.connect(uri);

  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}

export default connectDB;
