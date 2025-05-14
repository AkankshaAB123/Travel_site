const mysql= require('mysql2');
const db = require('../connection');

// Create a MySQL connection


// Handler to get all travel agents
exports.getAllAgents = (req, res) => {
  db.query('SELECT * FROM travel_agent', (err, results) => {
    if (err) {
      console.error('Error retrieving agents:', err.message);
      return res.status(500).json({ message: 'Error retrieving agents' });
    }
    res.json(results);
  });
};

// Handler to add a new travel agent
exports.addAgent = (req, res) => {
  const { afname, aemail, aphone, acity } = req.body;

  if (!afname || !aemail || !aphone || !acity) {
    return res.status(400).json({ message: 'Please provide all fields: afname, aemail, aphone, acity' });
  }

  const query = 'INSERT INTO travel_agent (afname, aemail, aphone, acity) VALUES (?, ?, ?, ?)';
  db.query(query, [afname, aemail, aphone, acity], (err, result) => {
    if (err) {
      console.error('Error adding agent:', err.message);
      return res.status(500).json({ message: 'Error adding agent' });
    }
    res.status(201).json({ message: 'Agent added successfully', agent_id: result.insertId });
  });
};

// Handler to update an agent's information
exports.updateAgent = (req, res) => {
  const { aid } = req.params;
  const { afname, aemail, aphone, acity } = req.body;

  if (!afname || !aemail || !aphone || !acity) {
    return res.status(400).json({ message: 'Please provide all fields: afname, aemail, aphone, acity' });
  }

  const query = 'UPDATE travel_agent SET afname = ?, aemail = ?, aphone = ?, acity = ? WHERE aid = ?';
  db.query(query, [afname, aemail, aphone, acity, aid], (err, result) => {
    if (err) {
      console.error('Error updating agent:', err.message);
      return res.status(500).json({ message: 'Error updating agent' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ message: 'Agent updated successfully' });
  });
};

// Handler to delete an agent by ID
exports.deleteAgent = (req, res) => {
  const { aid } = req.params;

  const query = 'DELETE FROM travel_agent WHERE aid = ?';
  db.query(query, [aid], (err, result) => {
    if (err) {
      console.error('Error deleting agent:', err.message);
      return res.status(500).json({ message: 'Error deleting agent' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ message: 'Agent deleted successfully' });
  });
};
