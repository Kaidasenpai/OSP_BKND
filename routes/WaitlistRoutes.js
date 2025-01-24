const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');

// Create Waitlist entry
router.post('/', async (req, res) => {
  try {
    const { name, email, researchInterest } = req.body;
    const newEntry = await Waitlist.create({ name, email, researchInterest });
    return res.status(201).json(newEntry);
  } catch (error) {
    return res.status(500).json({ error: 'Server error creating waitlist entry' });
  }
});

module.exports = router;
