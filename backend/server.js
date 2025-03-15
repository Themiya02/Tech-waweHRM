// server.js (Backend - Node.js)

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

// Routes
app.post("/api/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    console.log("Uploaded file path:", filePath); // Log file path for debugging

    // Prepare FormData for sending to OpenResume API (local)
    const formData = new FormData();
    formData.append("resume", fs.createReadStream(filePath));

    // Call local OpenResume backend for parsing
    const response = await fetch("http://localhost:3000/api/resume", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Error from OpenResume API:", response.status, response.statusText);
      throw new Error("Failed to parse resume");
    }

    const data = await response.json();
    console.log("Parsed Data:", data);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    // Return parsed data to frontend
    res.json(data);
  } catch (error) {
    console.error("Error parsing resume:", error);
    res.status(500).json({ message: "Failed to process resume", error: error.message });
  }
});

// Start the Server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);
