const mysql = require('mysql2');
const db = require('../connection');

// Your route handlers using db.query(...)



// Handler to get all feedback
exports.getAllFeedback = (req, res) => {
  db.query('SELECT * FROM feedback', (err, results) => {
    if (err) {
      console.error('Error retrieving feedback:', err.message);
      return res.status(500).json({ message: 'Error retrieving feedback' });
    }
    res.json(results);
  });
};

// Handler to get specific feedback by id
exports.getFeedbackById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM feedback WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error retrieving feedback:', err.message);
      return res.status(500).json({ message: 'Error retrieving feedback' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(result[0]);
  });
};

// Handler to add new feedback
exports.addFeedback = (req, res) => {
  const { name, email, feedbk } = req.body;

  if (!name || !email || !feedbk) {
    return res.status(400).json({ message: 'Please provide all fields: name, email, feedbk' });
  }

  const query = 'INSERT INTO feedback (name, email, feedbk) VALUES (?, ?, ?)';
  db.query(query, [name, email, feedbk], (err, result) => {
    if (err) {
      console.error('Error adding feedback:', err.message);
      return res.status(500).json({ message: 'Error adding feedback' });
    }
    res.status(201).json({ message: 'Feedback added successfully', feedback_id: result.insertId });
  });
};

// Handler to update feedback
exports.updateFeedback = (req, res) => {
  const { id } = req.params;
  const { name, email, feedbk } = req.body;

  if (!name || !email || !feedbk) {
    return res.status(400).json({ message: 'Please provide all fields: name, email, feedbk' });
  }

  const query = 'UPDATE feedback SET name = ?, email = ?, feedbk = ? WHERE id = ?';
  db.query(query, [name, email, feedbk, id], (err, result) => {
    if (err) {
      console.error('Error updating feedback:', err.message);
      return res.status(500).json({ message: 'Error updating feedback' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback updated successfully' });
  });
};

// Handler to delete feedback by id
exports.deleteFeedback = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM feedback WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting feedback:', err.message);
      return res.status(500).json({ message: 'Error deleting feedback' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  });
};
