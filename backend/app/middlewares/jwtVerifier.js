
const jwt = require('jsonwebtoken');
const secretKey = require('../config/auth.config').secret;

// Middleware to validate the token
const validateTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Extract token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided',valid:false });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
     if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired',valid:false });
      } else {
        return res.status(401).json({ message: 'Invalid token',valid:false });
      }
      
    }

    // Token is valid, attach the decoded payload to the request object
    req.decoded = decoded;
    next();
  });
};

// Export the middleware
module.exports = validateTokenMiddleware;
