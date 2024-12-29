import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import TokenDenylist from '../models/TokenDenylist.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader?.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Check if token is in denylist
      const deniedToken = await TokenDenylist.findOne({ token });
      if (deniedToken) {
        return res.status(401).json({
          message: 'Token has been invalidated'
        });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          message: 'User not found'
        });
      }

      // Attach user to request object
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token is invalid or expired'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export const faculty = (req, res, next) => {
  if (req.user && req.user.userType === 'faculty') {
    next();
  } else {
    res.status(403).json({
      message: 'Access denied. Faculty only route'
    });
  }
};

export const student = (req, res, next) => {
  if (req.user && req.user.userType === 'student') {
    next();
  } else {
    res.status(403).json({
      message: 'Access denied. Student only route'
    });
  }
};