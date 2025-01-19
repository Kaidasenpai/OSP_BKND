const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  resumeLink: { type: String },
  coverLetter: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
