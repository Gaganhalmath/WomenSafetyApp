// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_jwt_secret"; // Replace with a secure key

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, phoneNumber, emergencyContacts } = req.body;
  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phoneNumber, emergencyContacts });
    await newUser.save();
    return res.status(200).json({ success: true, message: "Signup successful." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Signup failed." });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials." });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed." });
  }
});

module.exports = router;
