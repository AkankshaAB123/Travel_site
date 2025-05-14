const db = require('../connection'); // Already initialized MySQL connection

// Get all bookings
exports.getAllBookings = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM booking', (err, results) => {
      if (err) {
        console.error('Error retrieving bookings:', err.message);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Get a booking by ID
exports.getBookingById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM booking WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error retrieving booking:', err.message);
        return reject(err);
      }
      resolve(results[0]); // Return first result or undefined
    });
  });
};

// Add a new booking
exports.addBooking = ({ ffirst, flast, femail, city, fphone, fdesti }) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO booking (ffirst, flast, femail, city, fphone, fdesti)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [ffirst, flast, femail, city, fphone, fdesti], (err, result) => {
      if (err) {
        console.error('Error adding booking:', err.message);
        return reject(err);
      }
      resolve({ id: result.insertId });
    });
  });
};

// Update a booking
exports.updateBooking = (id, { ffirst, flast, femail, city, fphone, fdesti }) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE booking
      SET ffirst = ?, flast = ?, femail = ?, city = ?, fphone = ?, fdesti = ?
      WHERE id = ?
    `;
    db.query(query, [ffirst, flast, femail, city, fphone, fdesti, id], (err, result) => {
      if (err) {
        console.error('Error updating booking:', err.message);
        return reject(err);
      }
      if (result.affectedRows === 0) {
        return resolve(null); // Booking not found
      }
      resolve({ updated: true });
    });
  });
};

// Delete a booking
exports.deleteBooking = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM booking WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting booking:', err.message);
        return reject(err);
      }
      if (result.affectedRows === 0) {
        return resolve(null); // Booking not found
      }
      resolve({ deleted: true });
    });
  });
};
