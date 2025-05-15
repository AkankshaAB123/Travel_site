const db = require('../connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  console.log('Registration request received:', req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log('Missing required fields:', { username, email, password: !!password });
    return res.status(400).json({ message: 'Please provide all fields: username, email, password' });
  }

  try {
    // First check if user already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      console.log('User already exists:', { username, email });
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    console.log('User registered successfully:', { userId: result.insertId, username });

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId, username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertId,
        username,
        email
      }
    });
  } catch (err) {
    console.error('Error in registration:', err);
    res.status(500).json({ 
      message: 'Error registering user',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Login user
exports.login = async (req, res) => {
  console.log('Login request received:', { username: req.body.username });
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Missing credentials:', { username: !!username, password: !!password });
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    // Check user credentials
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    console.log('User query result:', { found: users.length > 0 });

    if (users.length === 0) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password verification:', { isMatch });

    if (!isMatch) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Log the login attempt
    try {
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      await db.query(
        'INSERT INTO login (user, pass, date_time) VALUES (?, ?, ?)',
        [username, '****', now]
      );
    } catch (loginErr) {
      console.error('Error logging login attempt:', loginErr);
      // Don't fail the login if logging fails
    }

    console.log('User logged in successfully:', { userId: user.id, username });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ 
      message: 'Error during login',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}; 