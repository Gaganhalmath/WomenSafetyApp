// backend/routes/complaint.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.post('/complaint', async (req, res) => {
  const { fullName, email, phone, incidentDetails, evidence } = req.body;
  if (!fullName || !email || !phone || !incidentDetails) {
    return res.status(400).json({ success: false, error: "All required fields must be filled." });
  }
  try {
    const newComplaint = new Complaint({ fullName, email, phone, incidentDetails, evidence });
    await newComplaint.save();
    res.status(200).json({ success: true, message: "Complaint submitted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to submit complaint." });
  }
});

module.exports = router;
