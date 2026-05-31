const mongoose = require("mongoose");

// This file is responsible for connecting the project to MongoDB Atlas.
const connectDB = async () => {
  try {
    // MONGO_URI is stored in .env so the database link stays private.
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    // Mongoose uses this URI to connect Express with MongoDB.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(
      `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`,
    );
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
