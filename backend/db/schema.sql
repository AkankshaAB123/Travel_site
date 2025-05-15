-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS travel_site;

-- Use the database
USE travel_site;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes for users table
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);

-- Login history table
DROP TABLE IF EXISTS login;
CREATE TABLE login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    login_time DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add index for login table
CREATE INDEX idx_user_id ON login(user_id); 