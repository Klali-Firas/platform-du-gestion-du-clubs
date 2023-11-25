const jwt = require('jsonwebtoken');
const secretKey = require('../config/auth.config').secret;

// Middleware to verify if the received id matches the id in the JWT
const verifyId = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided',valid:false });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' ,valid:false});
      }

      const urlId = req.params.id;

      if (!urlId || urlId !== decoded.id) {
        return res.status(403).json({ message: 'Access forbidden. Invalid id in URL or JWT mismatch.' ,valid:false});
      }

      // Attach the decoded payload to the request object
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    console.error('Error in verifyIdMiddleware:', error);
    return res.status(500).json({ message: 'Internal Server Error' ,valid:false});
  }
};

module.exports = verifyId;
