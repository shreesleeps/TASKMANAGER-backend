const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());

// MongoDB connection URI
const mongoURI = process.env.MONGODB_URL;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
