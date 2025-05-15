const mysql = require('mysql2');
const db = require('../connection');

// Your route handlers using db.query(...)

// Create a MySQL connection

// Handler to get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM places');
    res.json(results);
  } catch (err) {
    console.error('Error retrieving places:', err.message);
    res.status(500).json({ message: 'Error retrieving places' });
  }
};

// Handler to get place by id
exports.getPlaceById = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('SELECT * FROM places WHERE pid = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(result[0]);
  } catch (err) {
    console.error('Error retrieving place:', err.message);
    res.status(500).json({ message: 'Error retrieving place' });
  }
};

// Handler to add a new place
exports.addPlace = async (req, res) => {
  const { pname, pcity } = req.body;
  if (!pname || !pcity) {
    return res.status(400).json({ message: 'Please provide both pname and pcity' });
  }
  try {
    const [result] = await db.query('INSERT INTO places (pname, pcity) VALUES (?, ?)', [pname, pcity]);
    res.status(201).json({ message: 'Place added successfully', place_id: result.insertId });
  } catch (err) {
    console.error('Error adding place:', err.message);
    res.status(500).json({ message: 'Error adding place' });
  }
};

// Handler to update place details
exports.updatePlace = async (req, res) => {
  const { id } = req.params;
  const { pname, pcity } = req.body;
  if (!pname || !pcity) {
    return res.status(400).json({ message: 'Please provide both pname and pcity' });
  }
  try {
    const [result] = await db.query('UPDATE places SET pname = ?, pcity = ? WHERE pid = ?', [pname, pcity, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place updated successfully' });
  } catch (err) {
    console.error('Error updating place:', err.message);
    res.status(500).json({ message: 'Error updating place' });
  }
};

// Handler to delete place by id
exports.deletePlace = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM places WHERE pid = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place deleted successfully' });
  } catch (err) {
    console.error('Error deleting place:', err.message);
    res.status(500).json({ message: 'Error deleting place' });
  }
};
