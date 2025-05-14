const mysql = require('mysql2');
const db = require('../connection');

// Your route handlers using db.query(...)



// Handler to get all payments
exports.getAllPayments = (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) {
      console.error('Error retrieving payments:', err.message);
      return res.status(500).json({ message: 'Error retrieving payments' });
    }
    res.json(results);
  });
};

// Handler to get payment by id
exports.getPaymentById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM payments WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error retrieving payment:', err.message);
      return res.status(500).json({ message: 'Error retrieving payment' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(result[0]);
  });
};

// Handler to add a new payment
exports.addPayment = (req, res) => {
  const { booking_id, payment_method, amount, payment_status, transaction_id } = req.body;

  if (!booking_id || !payment_method || !amount || !payment_status || !transaction_id) {
    return res.status(400).json({ message: 'Please provide all fields: booking_id, payment_method, amount, payment_status, transaction_id' });
  }

  const query = 'INSERT INTO payments (booking_id, payment_method, amount, payment_status, transaction_id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [booking_id, payment_method, amount, payment_status, transaction_id], (err, result) => {
    if (err) {
      console.error('Error adding payment:', err.message);
      return res.status(500).json({ message: 'Error adding payment' });
    }
    res.status(201).json({ message: 'Payment added successfully', payment_id: result.insertId });
  });
};

// Handler to update payment details
exports.updatePayment = (req, res) => {
  const { id } = req.params;
  const { payment_method, amount, payment_status, transaction_id } = req.body;

  if (!payment_method || !amount || !payment_status || !transaction_id) {
    return res.status(400).json({ message: 'Please provide all fields: payment_method, amount, payment_status, transaction_id' });
  }

  const query = 'UPDATE payments SET payment_method = ?, amount = ?, payment_status = ?, transaction_id = ? WHERE id = ?';
  db.query(query, [payment_method, amount, payment_status, transaction_id, id], (err, result) => {
    if (err) {
      console.error('Error updating payment:', err.message);
      return res.status(500).json({ message: 'Error updating payment' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment updated successfully' });
  });
};

// Handler to delete payment by id
exports.deletePayment = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM payments WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting payment:', err.message);
      return res.status(500).json({ message: 'Error deleting payment' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  });
};
