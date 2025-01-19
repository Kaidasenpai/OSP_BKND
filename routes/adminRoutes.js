const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Waitlist = require('../models/Waitlist');
const JobApplication = require('../models/JobApplication');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "m(qy`!~YfB^hvA*7kN#HuJ+bU6.;LQ$e'Fr]-npWSD94j&=3E123658749562147"
// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminUser = await Admin.findOne({ username });
    if (!adminUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, adminUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Create JWT
    const token = jwt.sign(
      { adminId: adminUser._id },
       JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during login' });
  }
});

// Middleware to verify JWT
function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    req.adminId = decoded.adminId;
    next();
  });
}

// Protected route to get Waitlist entries
router.get('/waitlist', verifyAdminToken, async (req, res) => {
  try {
    const waitlistEntries = await Waitlist.find().sort({ createdAt: -1 });
    return res.json(waitlistEntries);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching waitlist' });
  }
});

// Protected route to get Job Applications
router.get('/job-applications', verifyAdminToken, async (req, res) => {
  try {
    const jobApps = await JobApplication.find().sort({ createdAt: -1 });
    return res.json(jobApps);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching job applications' });
  }
});

module.exports = router;
