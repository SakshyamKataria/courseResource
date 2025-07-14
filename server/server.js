require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use("/auth", authRoutes); // All authentication routes
app.use("/notes", notesRoutes); // All notes-related routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// In server.js (after MongoDB connection)
const cloudinaryTest = require("./utils/cloudinary");

cloudinaryTest.api.ping()
  .then(result => console.log("Cloudinary Ping Result:", result))
  .catch(error => console.error("Cloudinary Ping Error:", error));

// Default route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
