const express = require('express');
const router = express.Router();
const db = require('../connection'); // Import the database connection

// Get all travel agents
router.get('/', (req, res) => {
  db.query('SELECT * FROM travel_agent', (err, results) => {
    if (err) {
      console.error('Error fetching travel agents:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Get a travel agent by ID
router.get('/:id', (req, res) => {
  const agentId = req.params.id;
  db.query('SELECT * FROM travel_agent WHERE aid = ?', [agentId], (err, results) => {
    if (err) {
      console.error('Error fetching agent:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) return res.status(404).send('Agent not found');
    res.json(results[0]);
  });
});

// Add a new travel agent
router.post('/', (req, res) => {
  const { afname, aemail, aphone, acity } = req.body; // Destructure the request body
  db.query(
    'INSERT INTO travel_agent (afname, aemail, aphone, acity) VALUES (?, ?, ?, ?)', 
    [afname, aemail, aphone, acity], // Values to insert
    (err, result) => {
      if (err) {
        console.error('Error inserting agent:', err);
        return res.status(500).send('Database error');
      }
      res.status(201).send('Agent added successfully');
    }
  );
});

// Update a travel agent's details
router.put('/:id', (req, res) => {
  const agentId = req.params.id; // Get the agent ID from the URL parameter
  const { afname, aemail, aphone, acity } = req.body; // Get data from the request body
  db.query(
    'UPDATE travel_agent SET afname = ?, aemail = ?, aphone = ?, acity = ? WHERE aid = ?',
    [afname, aemail, aphone, acity, agentId], // Values to update
    (err, result) => {
      if (err) {
        console.error('Error updating agent:', err);
        return res.status(500).send('Database error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Agent not found');
      }
      res.send('Agent updated successfully');
    }
  );
});

// Delete a travel agent
router.delete('/:id', (req, res) => {
  const agentId = req.params.id; // Get the agent ID from the URL parameter
  db.query('DELETE FROM travel_agent WHERE aid = ?', [agentId], (err, result) => {
    if (err) {
      console.error('Error deleting agent:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Agent not found');
    }
    res.send('Agent deleted successfully');
  });
});

module.exports = router;
