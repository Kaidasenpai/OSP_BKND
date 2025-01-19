require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const waitlistRoutes = require('./routes/waitlistRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const uri = "mongodb+srv://kaidasenpai:Ghythrf1@cluster0.xerjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/admin', adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
