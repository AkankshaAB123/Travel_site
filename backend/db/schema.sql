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

-- Place info table
CREATE TABLE IF NOT EXISTS place_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    place_id INT NOT NULL,
    description TEXT,
    best_time_to_visit VARCHAR(255),
    local_attractions TEXT,
    local_cuisine TEXT,
    transportation TEXT,
    accommodation TEXT,
    FOREIGN KEY (place_id) REFERENCES places(pid)
);

-- Sample data for place_info
INSERT INTO place_info (place_id, description, best_time_to_visit, local_attractions, local_cuisine, transportation, accommodation) VALUES
(1, 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.', 
'October to March', 
'Taj Mahal, Agra Fort, Fatehpur Sikri, Mehtab Bagh, Itmad-ud-Daulah', 
'Petha, Bedai, Mughlai cuisine, Tandoori dishes', 
'Air: Agra Airport, Rail: Agra Cantt Railway Station, Road: Well connected by NH2 and NH3', 
'Luxury hotels near Taj Mahal, Heritage hotels, Budget accommodations available'); 