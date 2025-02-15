import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("❌ Missing MONGO_URI in environment variables!");
}

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("🔄 Already connected to MongoDB.");
      return;
    }

    await mongoose.connect(MONGO_URI, {
      dbName: "Studentsphere",
    });

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Database connection failed!");
  }
};

export default connectDB;
