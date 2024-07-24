const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error in jwtMiddleware:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Generate Token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_KEY, { expiresIn: '1y' });
}

module.exports = {
  jwtAuthMiddleware,
  generateToken
}
