const express = require('express');
const router = express.Router();
const Location = require('./models/Location');

// POST /api/location to store location data
router.post('/location', async (req, res) => {
  const { userId, latitude, longitude } = req.body;
  
  if (!userId || latitude == null || longitude == null) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    const newLocation = new Location({ userId, latitude, longitude });
    await newLocation.save();
    res.status(200).json({ success: true, message: 'Location saved successfully.' });
  } catch (err) {
    console.error('Error saving location:', err);
    res.status(500).json({ success: false, message: 'Error saving location.' });
  }
});

module.exports = router;
