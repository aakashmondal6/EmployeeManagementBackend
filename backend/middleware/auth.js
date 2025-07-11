const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// This middleware function checks if the request has a valid JWT token in the Authorization header.
// If the token is valid, it adds the user information to the request object and calls the
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //check if the Authorization header is present
  // If the header is not present, return a 401 Unauthorized response
  if (!authHeader) 
    return res.status(401).json({ message: 'UnAuthorized access:No token provided' });
  const token = authHeader.split(' ')[1];

//verify the token using the JWT_SECRET
// If the token is invalid, return a 401 Unauthorized response
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      {
       return res.status(401).json({ message: 'Invalid token' });
      }
    req.user = user;
    next();
  });
};

// This middleware function checks if the user has one of the specified roles.
// If the user's role is not in the list of allowed roles, it returns a 403
exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  }
  next();
};