const mysql = require('mysql2');
const db = require('../connection');

// Your route handlers using db.query(...)



// Handler to get all customers
exports.getAllCustomers = (req, res) => {
  db.query('SELECT * FROM customer', (err, results) => {
    if (err) {
      console.error('Error retrieving customers:', err.message);
      return res.status(500).json({ message: 'Error retrieving customers' });
    }
    res.json(results);
  });
};

// Handler to get a specific customer by id
exports.getCustomerById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM customer WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error retrieving customer:', err.message);
      return res.status(500).json({ message: 'Error retrieving customer' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(result[0]);
  });
};

// Handler to add a new customer
exports.addCustomer = (req, res) => {
  const { fname, password, email, city, phone } = req.body;

  if (!fname || !password || !email || !city || !phone) {
    return res.status(400).json({ message: 'Please provide all fields: fname, password, email, city, phone' });
  }

  const query = 'INSERT INTO customer (fname, password, email, city, phone) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [fname, password, email, city, phone], (err, result) => {
    if (err) {
      console.error('Error adding customer:', err.message);
      return res.status(500).json({ message: 'Error adding customer' });
    }
    res.status(201).json({ message: 'Customer added successfully', customer_id: result.insertId });
  });
};

// Handler to update a customer's information
exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const { fname, password, email, city, phone } = req.body;

  if (!fname || !password || !email || !city || !phone) {
    return res.status(400).json({ message: 'Please provide all fields: fname, password, email, city, phone' });
  }

  const query = 'UPDATE customer SET fname = ?, password = ?, email = ?, city = ?, phone = ? WHERE id = ?';
  db.query(query, [fname, password, email, city, phone, id], (err, result) => {
    if (err) {
      console.error('Error updating customer:', err.message);
      return res.status(500).json({ message: 'Error updating customer' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer updated successfully' });
  });
};

// Handler to delete a customer by ID
exports.deleteCustomer = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM customer WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting customer:', err.message);
      return res.status(500).json({ message: 'Error deleting customer' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  });
};
