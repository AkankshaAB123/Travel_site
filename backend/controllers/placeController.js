const mysql = require('mysql2');
const db = require('../connection');

// Your route handlers using db.query(...)

// Create a MySQL connection

// Handler to get all places
exports.getAllPlaces = (req, res) => {
  db.query('SELECT * FROM places', (err, results) => {
    if (err) {
      console.error('Error retrieving places:', err.message);
      return res.status(500).json({ message: 'Error retrieving places' });
    }
    res.json(results);
  });
};

// Handler to get place by id
exports.getPlaceById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM places WHERE pid = ?', [id], (err, result) => {
    if (err) {
      console.error('Error retrieving place:', err.message);
      return res.status(500).json({ message: 'Error retrieving place' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(result[0]);
  });
};

// Handler to add a new place
exports.addPlace = (req, res) => {
  const { pname, pcity } = req.body;

  if (!pname || !pcity) {
    return res.status(400).json({ message: 'Please provide both pname and pcity' });
  }

  const query = 'INSERT INTO places (pname, pcity) VALUES (?, ?)';
  db.query(query, [pname, pcity], (err, result) => {
    if (err) {
      console.error('Error adding place:', err.message);
      return res.status(500).json({ message: 'Error adding place' });
    }
    res.status(201).json({ message: 'Place added successfully', place_id: result.insertId });
  });
};

// Handler to update place details
exports.updatePlace = (req, res) => {
  const { id } = req.params;
  const { pname, pcity } = req.body;

  if (!pname || !pcity) {
    return res.status(400).json({ message: 'Please provide both pname and pcity' });
  }

  const query = 'UPDATE places SET pname = ?, pcity = ? WHERE pid = ?';
  db.query(query, [pname, pcity, id], (err, result) => {
    if (err) {
      console.error('Error updating place:', err.message);
      return res.status(500).json({ message: 'Error updating place' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place updated successfully' });
  });
};

// Handler to delete place by id
exports.deletePlace = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM places WHERE pid = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting place:', err.message);
      return res.status(500).json({ message: 'Error deleting place' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place deleted successfully' });
  });
};
