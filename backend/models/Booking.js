const express = require('express');
const router = express.Router();
const db = require('../connection'); // Import the database connection

// Get all bookings
router.get('/', (req, res) => {
  db.query('SELECT * FROM booking', (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Get a booking by ID
router.get('/:id', (req, res) => {
  const bookingId = req.params.id;
  db.query('SELECT * FROM booking WHERE id = ?', [bookingId], (err, results) => {
    if (err) {
      console.error('Error fetching booking:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('Booking not found');
    res.json(results[0]);
  });
});

// Add a new booking
router.post('/', (req, res) => {
  const { ffirst, flast, femail, city, fphone, fdesti } = req.body;
  db.query(
    'INSERT INTO booking (ffirst, flast, femail, city, fphone, fdesti) VALUES (?, ?, ?, ?, ?, ?)', 
    [ffirst, flast, femail, city, fphone, fdesti], // Values to insert
    (err, result) => {
      if (err) {
        console.error('Error inserting booking:', err);
        return res.status(500).send('Database error');
      }
      res.status(201).send('Booking added successfully');
    }
  );
});

// Update a booking
router.put('/:id', (req, res) => {
  const bookingId = req.params.id; // Get booking ID from URL parameter
  const { ffirst, flast, femail, city, fphone, fdesti } = req.body; // Get updated data
  db.query(
    'UPDATE booking SET ffirst = ?, flast = ?, femail = ?, city = ?, fphone = ?, fdesti = ? WHERE id = ?',
    [ffirst, flast, femail, city, fphone, fdesti, bookingId], // Values to update
    (err, result) => {
      if (err) {
        console.error('Error updating booking:', err);
        return res.status(500).send('Database error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Booking not found');
      }
      res.send('Booking updated successfully');
    }
  );
});

// Delete a booking
router.delete('/:id', (req, res) => {
  const bookingId = req.params.id; // Get booking ID from URL parameter
  db.query('DELETE FROM booking WHERE id = ?', [bookingId], (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Booking not found');
    }
    res.send('Booking deleted successfully');
  });
});

module.exports = router;
