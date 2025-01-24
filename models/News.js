const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, default: "Coming Soon" },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, default: '#' },
  isBlogPost: { type: Boolean, default: false },
  blogContent: { type: String, default: '' },
  hasSpecificDate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);
