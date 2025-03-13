// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaint');
const locationRoutes = require('./routes/location'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('.................', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', complaintRoutes);
app.use('/api', locationRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
