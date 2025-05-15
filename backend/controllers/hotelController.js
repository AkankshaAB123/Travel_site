const mysql = require('mysql2');
const db = require('../connection');

// Your route handlers using db.query(...)



// Handler to get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM hotels');
    res.json(results);
  } catch (err) {
    console.error('Error retrieving hotels:', err.message);
    res.status(500).json({ message: 'Error retrieving hotels' });
  }
};

// Handler to get hotel by id
exports.getHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('SELECT * FROM hotels WHERE hid = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(result[0]);
  } catch (err) {
    console.error('Error retrieving hotel:', err.message);
    res.status(500).json({ message: 'Error retrieving hotel' });
  }
};

// Handler to add a new hotel
exports.addHotel = async (req, res) => {
  const { hname, hphone, hcity } = req.body;
  if (!hname || !hphone || !hcity) {
    return res.status(400).json({ message: 'Please provide all fields: hname, hphone, hcity' });
  }
  try {
    const [result] = await db.query('INSERT INTO hotels (hname, hphone, hcity) VALUES (?, ?, ?)', [hname, hphone, hcity]);
    res.status(201).json({ message: 'Hotel added successfully', hotel_id: result.insertId });
  } catch (err) {
    console.error('Error adding hotel:', err.message);
    res.status(500).json({ message: 'Error adding hotel' });
  }
};

// Handler to update hotel details
exports.updateHotel = async (req, res) => {
  const { id } = req.params;
  const { hname, hphone, hcity } = req.body;
  if (!hname || !hphone || !hcity) {
    return res.status(400).json({ message: 'Please provide all fields: hname, hphone, hcity' });
  }
  try {
    const [result] = await db.query('UPDATE hotels SET hname = ?, hphone = ?, hcity = ? WHERE hid = ?', [hname, hphone, hcity, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel updated successfully' });
  } catch (err) {
    console.error('Error updating hotel:', err.message);
    res.status(500).json({ message: 'Error updating hotel' });
  }
};

// Handler to delete hotel by id
exports.deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM hotels WHERE hid = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    console.error('Error deleting hotel:', err.message);
    res.status(500).json({ message: 'Error deleting hotel' });
  }
};
