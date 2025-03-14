// backend/models/Complaint.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  incidentDetails: { type: String, required: true },
  evidence: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
