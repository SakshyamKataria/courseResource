const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Import if you decide to hash passwords
const router = express.Router();

// Consider fetching this from an environment variable
// const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
// In a real app, ADMIN_PASSWORD should be a hashed value
const ADMIN_PASSWORD = "admin123";

// POST /login - Admin login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Consider making expiresIn configurable
        return res.status(200).json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;