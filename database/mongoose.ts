import "dotenv/config";
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongooseCache: {
    connection: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { connection: null, promise: null };
}

export const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI mus be set within .env ");

  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  console.log(`Connected to database ${process.env.NODE_ENV} ${MONGODB_URI}`);
};
