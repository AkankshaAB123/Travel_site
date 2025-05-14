// config.js (Backend)
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',   // Your MySQL username
  DB_PASSWORD: process.env.DB_PASSWORD || '',  // Your MySQL password
  DB_NAME: process.env.DB_NAME || 'travel_site',  // Your database name
  PORT: process.env.PORT || 5000  // API Server Port
};
