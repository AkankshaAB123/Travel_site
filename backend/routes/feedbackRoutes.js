const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController'); // Import the feedback controller

// Route to get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbackList = await feedbackController.getAllFeedback();
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get feedback', error });
  }
});

// Route to get a specific feedback by ID
router.get('/:id', async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const feedback = await feedbackController.getFeedbackById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get feedback', error });
  }
});

// Route to add new feedback
router.post('/', async (req, res) => {
  const { customer_id, rating, comments } = req.body;
  try {
    const newFeedback = await feedbackController.addFeedback({ customer_id, rating, comments });
    res.status(201).json({ message: 'Feedback created successfully', feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create feedback', error });
  }
});

// Route to update feedback by ID
router.put('/:id', async (req, res) => {
  const feedbackId = req.params.id;
  const { rating, comments } = req.body;
  try {
    const updatedFeedback = await feedbackController.updateFeedback(feedbackId, { rating, comments });
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update feedback', error });
  }
});

// Route to delete feedback by ID
router.delete('/:id', async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const deletedFeedback = await feedbackController.deleteFeedback(feedbackId);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete feedback', error });
  }
});

module.exports = router;
