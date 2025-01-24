require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const waitlistRoutes = require('./routes/WaitlistRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const uri = "mongodb+srv://kaidasenpai:Ghythrf1@cluster0.xerjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
