const express = require('express');
const router = express.Router();
const db = require('../connection'); // Import the database connection

// Get all payments
router.get('/', (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Get payment by ID
router.get('/:id', (req, res) => {
  const paymentId = req.params.id;
  db.query('SELECT * FROM payments WHERE id = ?', [paymentId], (err, results) => {
    if (err) {
      console.error('Error fetching payment:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('Payment not found');
    res.json(results[0]);
  });
});

// Add a new payment
router.post('/', (req, res) => {
  const { booking_id, payment_method, amount, payment_status, transaction_id } = req.body;
  db.query(
    'INSERT INTO payments (booking_id, payment_method, amount, payment_status, transaction_id) VALUES (?, ?, ?, ?, ?)',
    [booking_id, payment_method, amount, payment_status, transaction_id], // Values to insert into the database
    (err, result) => {
      if (err) {
        console.error('Error inserting payment:', err);
        return res.status(500).send('Database error');
      }
      res.status(201).send('Payment added successfully');
    }
  );
});

// Update an existing payment
router.put('/:id', (req, res) => {
  const paymentId = req.params.id; // Get payment ID from URL parameters
  const { booking_id, payment_method, amount, payment_status, transaction_id } = req.body; // Get updated details
  db.query(
    'UPDATE payments SET booking_id = ?, payment_method = ?, amount = ?, payment_status = ?, transaction_id = ? WHERE id = ?',
    [booking_id, payment_method, amount, payment_status, transaction_id, paymentId], // Updated values
    (err, result) => {
      if (err) {
        console.error('Error updating payment:', err);
        return res.status(500).send('Database error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Payment not found');
      }
      res.send('Payment updated successfully');
    }
  );
});

// Delete a payment
router.delete('/:id', (req, res) => {
  const paymentId = req.params.id; // Get payment ID from URL parameter
  db.query('DELETE FROM payments WHERE id = ?', [paymentId], (err, result) => {
    if (err) {
      console.error('Error deleting payment:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Payment not found');
    }
    res.send('Payment deleted successfully');
  });
});

module.exports = router;
