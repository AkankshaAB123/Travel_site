const express = require('express');
const router = express.Router();
const db = require('../connection'); // Import the database connection

// Get all feedback
router.get('/', (req, res) => {
  db.query('SELECT * FROM feedback', (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Get feedback by ID
router.get('/:id', (req, res) => {
  const feedbackId = req.params.id;
  db.query('SELECT * FROM feedback WHERE id = ?', [feedbackId], (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('Feedback not found');
    res.json(results[0]);
  });
});

// Add a new feedback
router.post('/', (req, res) => {
  const { name, email, feedbk } = req.body;
  db.query(
    'INSERT INTO feedback (name, email, feedbk) VALUES (?, ?, ?)',
    [name, email, feedbk], // Values to insert
    (err, result) => {
      if (err) {
        console.error('Error inserting feedback:', err);
        return res.status(500).send('Database error');
      }
      res.status(201).send('Feedback added successfully');
    }
  );
});

// Update a feedback
router.put('/:id', (req, res) => {
  const feedbackId = req.params.id; // Get feedback ID from URL parameter
  const { name, email, feedbk } = req.body; // Get updated data
  db.query(
    'UPDATE feedback SET name = ?, email = ?, feedbk = ? WHERE id = ?',
    [name, email, feedbk, feedbackId], // Values to update
    (err, result) => {
      if (err) {
        console.error('Error updating feedback:', err);
        return res.status(500).send('Database error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Feedback not found');
      }
      res.send('Feedback updated successfully');
    }
  );
});

// Delete a feedback
router.delete('/:id', (req, res) => {
  const feedbackId = req.params.id; // Get feedback ID from URL parameter
  db.query('DELETE FROM feedback WHERE id = ?', [feedbackId], (err, result) => {
    if (err) {
      console.error('Error deleting feedback:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Feedback not found');
    }
    res.send('Feedback deleted successfully');
  });
});

module.exports = router;
