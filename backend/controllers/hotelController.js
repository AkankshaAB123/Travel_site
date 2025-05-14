const mysql = require('mysql2');
const db = require('../connection');

// Your route handlers using db.query(...)



// Handler to get all hotels
exports.getAllHotels = (req, res) => {
  db.query('SELECT * FROM hotels', (err, results) => {
    if (err) {
      console.error('Error retrieving hotels:', err.message);
      return res.status(500).json({ message: 'Error retrieving hotels' });
    }
    res.json(results);
  });
};

// Handler to get hotel by id
exports.getHotelById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM hotels WHERE hid = ?', [id], (err, result) => {
    if (err) {
      console.error('Error retrieving hotel:', err.message);
      return res.status(500).json({ message: 'Error retrieving hotel' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(result[0]);
  });
};

// Handler to add a new hotel
exports.addHotel = (req, res) => {
  const { hname, hphone, hcity } = req.body;

  if (!hname || !hphone || !hcity) {
    return res.status(400).json({ message: 'Please provide all fields: hname, hphone, hcity' });
  }

  const query = 'INSERT INTO hotels (hname, hphone, hcity) VALUES (?, ?, ?)';
  db.query(query, [hname, hphone, hcity], (err, result) => {
    if (err) {
      console.error('Error adding hotel:', err.message);
      return res.status(500).json({ message: 'Error adding hotel' });
    }
    res.status(201).json({ message: 'Hotel added successfully', hotel_id: result.insertId });
  });
};

// Handler to update hotel details
exports.updateHotel = (req, res) => {
  const { id } = req.params;
  const { hname, hphone, hcity } = req.body;

  if (!hname || !hphone || !hcity) {
    return res.status(400).json({ message: 'Please provide all fields: hname, hphone, hcity' });
  }

  const query = 'UPDATE hotels SET hname = ?, hphone = ?, hcity = ? WHERE hid = ?';
  db.query(query, [hname, hphone, hcity, id], (err, result) => {
    if (err) {
      console.error('Error updating hotel:', err.message);
      return res.status(500).json({ message: 'Error updating hotel' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel updated successfully' });
  });
};

// Handler to delete hotel by id
exports.deleteHotel = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM hotels WHERE hid = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting hotel:', err.message);
      return res.status(500).json({ message: 'Error deleting hotel' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  });
};
