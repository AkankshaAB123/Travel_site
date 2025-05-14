const express = require('express');
const router = express.Router();
const db = require('../connection'); // Import the database connection

// Get all places
router.get('/', (req, res) => {
  db.query('SELECT * FROM places', (err, results) => {
    if (err) {
      console.error('Error fetching places:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Get place by ID
router.get('/:id', (req, res) => {
  const placeId = req.params.id;
  db.query('SELECT * FROM places WHERE pid = ?', [placeId], (err, results) => {
    if (err) {
      console.error('Error fetching place:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('Place not found');
    res.json(results[0]);
  });
});

// Add a new place
router.post('/', (req, res) => {
  const { pname, pcity } = req.body;
  db.query(
    'INSERT INTO places (pname, pcity) VALUES (?, ?)',
    [pname, pcity], // Values to insert into the database
    (err, result) => {
      if (err) {
        console.error('Error inserting place:', err);
        return res.status(500).send('Database error');
      }
      res.status(201).send('Place added successfully');
    }
  );
});

// Update an existing place
router.put('/:id', (req, res) => {
  const placeId = req.params.id; // Get place ID from URL parameters
  const { pname, pcity } = req.body; // Get updated details
  db.query(
    'UPDATE places SET pname = ?, pcity = ? WHERE pid = ?',
    [pname, pcity, placeId], // Updated values
    (err, result) => {
      if (err) {
        console.error('Error updating place:', err);
        return res.status(500).send('Database error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Place not found');
      }
      res.send('Place updated successfully');
    }
  );
});

// Delete a place
router.delete('/:id', (req, res) => {
  const placeId = req.params.id; // Get place ID from URL parameter
  db.query('DELETE FROM places WHERE pid = ?', [placeId], (err, result) => {
    if (err) {
      console.error('Error deleting place:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Place not found');
    }
    res.send('Place deleted successfully');
  });
});

module.exports = router;
