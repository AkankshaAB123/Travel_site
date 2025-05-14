const express = require('express');
const router = express.Router();
const db = require('../connection'); // Import the database connection

// Get all hotels
router.get('/', (req, res) => {
  db.query('SELECT * FROM hotels', (err, results) => {
    if (err) {
      console.error('Error fetching hotels:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Get hotel by ID
router.get('/:id', (req, res) => {
  const hotelId = req.params.id;
  db.query('SELECT * FROM hotels WHERE hid = ?', [hotelId], (err, results) => {
    if (err) {
      console.error('Error fetching hotel:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('Hotel not found');
    res.json(results[0]);
  });
});

// Add a new hotel
router.post('/', (req, res) => {
  const { hname, hphone, hcity } = req.body; // Extract hotel details from the request body
  db.query(
    'INSERT INTO hotels (hname, hphone, hcity) VALUES (?, ?, ?)',
    [hname, hphone, hcity], // Values to insert into the database
    (err, result) => {
      if (err) {
        console.error('Error inserting hotel:', err);
        return res.status(500).send('Database error');
      }
      res.status(201).send('Hotel added successfully');
    }
  );
});

// Update an existing hotel
router.put('/:id', (req, res) => {
  const hotelId = req.params.id; // Get hotel ID from URL parameters
  const { hname, hphone, hcity } = req.body; // Get updated details
  db.query(
    'UPDATE hotels SET hname = ?, hphone = ?, hcity = ? WHERE hid = ?',
    [hname, hphone, hcity, hotelId], // Updated values
    (err, result) => {
      if (err) {
        console.error('Error updating hotel:', err);
        return res.status(500).send('Database error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Hotel not found');
      }
      res.send('Hotel updated successfully');
    }
  );
});

// Delete a hotel
router.delete('/:id', (req, res) => {
  const hotelId = req.params.id; // Get hotel ID from URL parameter
  db.query('DELETE FROM hotels WHERE hid = ?', [hotelId], (err, result) => {
    if (err) {
      console.error('Error deleting hotel:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Hotel not found');
    }
    res.send('Hotel deleted successfully');
  });
});

module.exports = router;
