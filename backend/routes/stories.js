const express = require('express');
const Story = require('../models/Story');
const router = express.Router();
const auth = require('../middleware/auth');

// Get all stories (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name');

    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new story
router.post('/', auth, async (req, res) => {
  const story = new Story({
    title: req.body.title,
    content: req.body.content,
    mediaType: req.body.mediaType,
    mediaUrl: req.body.mediaUrl,
    author: req.user.id,
    tags: req.body.tags
  });

  try {
    const newStory = await story.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Like/Unlike a story
router.post('/:id/like', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const likeIndex = story.likes.indexOf(req.user.id);
    
    if (likeIndex === -1) {
      story.likes.push(req.user.id);
    } else {
      story.likes.splice(likeIndex, 1);
    }

    await story.save();
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 