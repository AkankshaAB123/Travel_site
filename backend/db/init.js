const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbName = process.env.DB_NAME || 'travel_site';

// Read the schema file
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// Split the schema into individual statements and filter out comments
const statements = schema
  .split(';')
  .map(statement => statement.trim())
  .filter(statement => statement && !statement.startsWith('--'));

async function initializeDatabase() {
  // Step 1: Connect without database, create DB if needed
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  try {
    await connection.promise().connect();
    console.log('Connected to MySQL server');
    // Create the database if it doesn't exist
    await connection.promise().query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' ensured.`);
  } catch (error) {
    console.error('Error creating database:', error);
    connection.end();
    return;
  }
  connection.end();

  // Step 2: Connect to the database and run the rest of the schema
  const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: dbName
  });

  try {
    await dbConnection.promise().connect();
    console.log(`Connected to database '${dbName}'`);
    // Skip CREATE DATABASE and USE statements
    for (const statement of statements) {
      if (statement.toUpperCase().startsWith('CREATE DATABASE') || statement.toUpperCase().startsWith('USE ')) {
        continue;
      }
      try {
        await dbConnection.promise().query(statement);
        console.log('Executed:', statement.split('\n')[0]);
      } catch (error) {
        console.error('Error executing statement:', error.message);
        console.error('Statement:', statement);
      }
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    dbConnection.end();
  }
}

// Run the initialization
initializeDatabase(); 