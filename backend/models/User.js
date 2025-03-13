// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emergencyContacts: [
    {
      name: String,
      phone: String,
      important: { type: Boolean, default: false },
      contact: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
      addedAt: {type: Date, default: Date.now}
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
