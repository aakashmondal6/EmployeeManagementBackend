const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'UnAuthorized access:No token provided' });
  const token = authHeader.split(' ')[1];
  //console.log('Incoming token:', token)
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      {
        //console.error('JWT verify error:', err)
       return res.status(401).json({ message: 'Invalid token' });
      }
    req.user = user;
    next();
  });
};

exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  }
  next();
};