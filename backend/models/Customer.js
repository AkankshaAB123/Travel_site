const express = require('express');
const router = express.Router();
const db = require('../connection'); // Import the database connection

// Get all customers
router.get('/', (req, res) => {
  db.query('SELECT * FROM customer', (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Get a customer by ID
router.get('/:id', (req, res) => {
  const customerId = req.params.id;
  db.query('SELECT * FROM customer WHERE id = ?', [customerId], (err, results) => {
    if (err) {
      console.error('Error fetching customer:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('Customer not found');
    res.json(results[0]);
  });
});

// Add a new customer
router.post('/', (req, res) => {
  const { fname, password, email, city, phone } = req.body;
  db.query(
    'INSERT INTO customer (fname, password, email, city, phone) VALUES (?, ?, ?, ?, ?)', 
    [fname, password, email, city, phone], // Values to insert
    (err, result) => {
      if (err) {
        console.error('Error inserting customer:', err);
        return res.status(500).send('Database error');
      }
      res.status(201).send('Customer added successfully');
    }
  );
});

// Update a customer
router.put('/:id', (req, res) => {
  const customerId = req.params.id; // Get customer ID from URL parameter
  const { fname, password, email, city, phone } = req.body; // Get updated data
  db.query(
    'UPDATE customer SET fname = ?, password = ?, email = ?, city = ?, phone = ? WHERE id = ?',
    [fname, password, email, city, phone, customerId], // Values to update
    (err, result) => {
      if (err) {
        console.error('Error updating customer:', err);
        return res.status(500).send('Database error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Customer not found');
      }
      res.send('Customer updated successfully');
    }
  );
});

// Delete a customer
router.delete('/:id', (req, res) => {
  const customerId = req.params.id; // Get customer ID from URL parameter
  db.query('DELETE FROM customer WHERE id = ?', [customerId], (err, result) => {
    if (err) {
      console.error('Error deleting customer:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Customer not found');
    }
    res.send('Customer deleted successfully');
  });
});

module.exports = router;
