const db = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// JWT_SECRET is used to sign the JWT tokens. It should be kept secret and not exposed publicly.
// Fetching the JWT secret from environment variables.
const JWT_SECRET = process.env.JWT_SECRET;


// Register method which allows a new user to register by providing a username, password, and role.
// It hashes the password using bcrypt and stores the user details in the database.
exports.register = (req, res, next) => {
  const { username, password, role } = req.body;

  // Check if mandatory username, password, and role are provided in the request body
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }
  
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return next(err);
    db.run(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hash, role],
      function (err) {
        //check is the username already exists in the database
        // If the error is due to a unique constraint violation, return a 409 status code
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(409).json({ message: 'Username already exists' });
          }
          return next(err);
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};

// Login method which allows a user to log in by providing a username and password.
exports.login = (req, res, next) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return next(err);
    // Check if user exists
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    // If user exists, compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    // If password does not match, return 401 Unauthorized
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });


// If password matches, create a JWT token with user details and return it in the response
// The token includes the user's id, username, and role, and is signed with the JWT and return the token and role as a JSON response.
const token = jwt.sign(
  { id: user.id, username: user.username, role: user.role },
  JWT_SECRET,
  { expiresIn: '1h' } 
);    
res.json({ token, role: user.role });
  });
};