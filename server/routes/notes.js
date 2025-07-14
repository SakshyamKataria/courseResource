const Note = require("../models/Note");
const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const upload = require("../middleware/multer");
const router = express.Router();
const nodemailer = require("nodemailer"); // Moved nodemailer import to the top
const cloudinary = require("../utils/cloudinary");

// POST /notes/upload
// In routes/notes.js
router.post("/upload", verifyAdmin, upload.single("file"), async (req, res) => {
    console.log("➡️ /notes/upload route handler started");
    console.log("  req.body:", req.body);
    console.log("  req.file after upload middleware:", req.file);
    console.log("  req.file.path:", req.file.path); // Add this line

    const { semester, subject } = req.body;

    if (!semester || !subject || !req.file) {
        return res.status(400).json({ message: "All fields and file are required" });
    }

    try {
        const newNote = new Note({
            name: req.file.originalname,
            fileUrl: req.file.path, // Save the secure_url from Cloudinary
            subject,
            semester,
        });

        const savedNote = await newNote.save();
        console.log("  Note saved to database:", savedNote);
        res.status(200).json({ message: "✅ File uploaded", note: savedNote });
    } catch (error) {
        console.error("  Error saving note to database:", error);
        res.status(500).json({ message: "❌ Failed to upload", error });
    }
});


/*// POST /notes/upload - Test route without file upload
router.post("/upload", verifyAdmin, async (req, res) => {
    console.log("➡️ /notes/upload route handler started");
    res.status(200).send("Upload route reached for testing");
});
*/


// GET /notes - get all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ uploadedAt: -1 });
        res.status(200).json({ notes });
    } catch (err) {
        console.error("Error fetching notes:", err); // Log the error
        res.status(500).json({ message: "❌ Could not fetch notes" });
    }
});

router.post("/request", async (req, res) => {
    const { email, subject, semester } = req.body;

    if (!email || !subject || !semester) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,       // ✅ Use environment variable
            pass: process.env.GMAIL_APP_PASSWORD, // ✅ Use environment variable (App Password)
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.ADMIN_EMAIL, // Use environment variable for admin email as well
        subject: "New Note Request",
        text: `Request from: ${email}\nSemester: ${semester}\nSubject: ${subject}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent" });
    } catch (err) {
        console.error("Error sending email:", err); // Log the error
        res.status(500).json({ message: "Failed to send email", error: err });
    }
});

router.get("/cloudinary/cmma-notes",async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'cmma/', // Specify the folder "cmma"
      max_results: 100,
    });
    res.status(200).json({ files: result.resources });
  } catch (error) {
    console.error("Error fetching CMMA Cloudinary resources:", error);
    res.status(500).json({ message: "Failed to fetch CMMA files from Cloudinary", error });
  }
});

module.exports = router;