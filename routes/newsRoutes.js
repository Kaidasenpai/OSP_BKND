const express = require('express');
const router = express.Router();
const News = require('../models/News');
const { verifyAdminToken } = require('../middleware/auth');

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching news' });
  }
});

// Get single news item
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching news item' });
  }
});

// Create new news item (admin only)
router.post('/', verifyAdminToken, async (req, res) => {
  try {
    // Add validation for required fields
    if (!req.body.title || !req.body.date || !req.body.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const { title, date, description, image, link, isBlogPost, blogContent } = req.body;
    const newNews = await News.create({ 
      title, 
      date, 
      description, 
      image, 
      link: isBlogPost ? '' : link,
      isBlogPost,
      blogContent: isBlogPost ? blogContent : ''
    });
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: 'Server error creating news item' });
  }
});

// Delete news item (admin only)
router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json({ message: 'News item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting news item' });
  }
});

// Update news item (admin only)
router.put('/:id', verifyAdminToken, async (req, res) => {
  try {
    const newsItem = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!newsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error updating news item' });
  }
});

module.exports = router;
