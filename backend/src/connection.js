// connection.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Log the database configuration (without password)
console.log('Database configuration:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'travel_site'
});

// Handle connection errors
db.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Database connection was closed. Reconnecting...');
    db.connect();
  } else if (err.code === 'ER_CON_COUNT_ERROR') {
    console.log('Database has too many connections.');
  } else if (err.code === 'ECONNREFUSED') {
    console.log('Database connection was refused.');
  } else {
    console.error('Database error:', err);
  }
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Successfully connected to the database');
  
  // Test the connection by querying the users table
  db.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Error checking tables:', err);
      return;
    }
    console.log('Available tables:', results.map(r => Object.values(r)[0]));
  });
});

module.exports = db; 