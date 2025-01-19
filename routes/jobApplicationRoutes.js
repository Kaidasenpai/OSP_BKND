const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');

// Create Job Application
router.post('/', async (req, res) => {
  try {
    const { fullName, email, position, resumeLink, coverLetter } = req.body;
    const newApp = await JobApplication.create({
      fullName,
      email,
      position,
      resumeLink,
      coverLetter,
    });
    return res.status(201).json(newApp);
  } catch (error) {
    return res.status(500).json({ error: 'Server error creating job application' });
  }
});

module.exports = router;
