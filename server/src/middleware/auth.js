import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_smart_agri_2026');

    if (prisma) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: { id: true, name: true, email: true, role: true, preferredLanguage: true, state: true, district: true },
        });
        if (user) {
          req.user = user;
          return next();
        }
      } catch (dbErr) {
        console.warn('DB lookup failed in protect middleware, using decoded token payload:', dbErr.message);
      }
    }

    // Fallback if DB is disconnected
    req.user = { id: decoded.id, name: decoded.name || 'Farmer', email: decoded.email, role: 'FARMER' };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_smart_agri_2026');
      req.user = { id: decoded.id, name: decoded.name || 'Farmer', email: decoded.email, role: 'FARMER' };
    }
  } catch (err) {
    // Ignore auth errors for optional auth
  }
  next();
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
  }
  next();
};
