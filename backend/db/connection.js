// connection.js

const mysql = require('mysql');

// Create a MySQL connection pool (recommended for production)
const db = mysql.createPool({
  host: 'localhost',       // or your DB host (e.g., '127.0.0.1')
  user: 'root',            // your MySQL username
  password: 'aka123',            // your MySQL password (empty if none)
  database: 'travel_site'  // your database name
});

// Export the connection
module.exports = db;
