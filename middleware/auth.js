const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('No token provided');
    }

    // 2. Verify token
    const decoded = jwt.verify(token, 'secret'); // Must match your JWT secret
    
    // 3. Find user (including their posts)
    const user = await User.findOne({ _id: decoded._id })
      .select('-password'); // Exclude password

    if (!user) {
      throw new Error('User not found');
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ 
      error: 'Please authenticate',
      details: error.message 
    });
  }
};

module.exports = auth;