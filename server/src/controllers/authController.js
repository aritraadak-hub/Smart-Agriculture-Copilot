import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt.js';
import { apiResponse } from '../utils/apiResponse.js';

const prisma = new PrismaClient();

// In-memory mock storage if database is unavailable
const mockUsers = new Map();

// Helper to register demo user into memory fallback
const getDemoUser = () => ({
  id: 'guest-farmer-001',
  name: 'Rajesh Kumar',
  email: 'farmer@demo.com',
  phone: '9876543210',
  state: 'Punjab',
  district: 'Ludhiana',
  preferredLanguage: 'en',
  role: 'FARMER',
  createdAt: new Date().toISOString(),
});

export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, state, district, preferredLanguage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(apiResponse(false, 'Name, email, and password are required'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json(apiResponse(false, 'Email is already registered'));
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          state,
          district,
          preferredLanguage: preferredLanguage || 'en',
        },
      });
    } catch (dbErr) {
      console.warn('[DB Fallback] Using memory store for registration:', dbErr.message);
      if (mockUsers.has(email)) {
        return res.status(400).json(apiResponse(false, 'Email is already registered'));
      }
      user = {
        id: `usr_${Date.now()}`,
        name,
        email,
        phone,
        password: hashedPassword,
        state: state || 'Punjab',
        district: district || 'Ludhiana',
        preferredLanguage: preferredLanguage || 'en',
        role: 'FARMER',
        createdAt: new Date().toISOString(),
      };
      mockUsers.set(email, user);
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(
      apiResponse(true, 'Registration successful', {
        user: userWithoutPassword,
        token,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(apiResponse(false, 'Email and password are required'));
    }

    let user;
    let isPasswordValid = false;

    try {
      user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        isPasswordValid = await bcrypt.compare(password, user.password);
      }
    } catch (dbErr) {
      console.warn('[DB Fallback] Checking mock users / demo credentials:', dbErr.message);
      if (email === 'farmer@demo.com' && password === 'password123') {
        user = getDemoUser();
        isPasswordValid = true;
      } else if (mockUsers.has(email)) {
        user = mockUsers.get(email);
        isPasswordValid = await bcrypt.compare(password, user.password);
      }
    }

    if (!user || !isPasswordValid) {
      // Allow demo login shortcut
      if (email === 'farmer@demo.com' || email === 'guest') {
        user = getDemoUser();
        isPasswordValid = true;
      } else {
        return res.status(401).json(apiResponse(false, 'Invalid email or password'));
      }
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const { password: _, ...userWithoutPassword } = user;

    return res.json(
      apiResponse(true, 'Login successful', {
        user: userWithoutPassword,
        token,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const guestLogin = async (req, res, next) => {
  try {
    const guestUser = getDemoUser();
    const token = generateToken({ id: guestUser.id, email: guestUser.email, role: guestUser.role });
    return res.json(
      apiResponse(true, 'Logged in as Demo Farmer Guest', {
        user: guestUser,
        token,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    let user = null;

    try {
      if (prisma.user) {
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            state: true,
            district: true,
            preferredLanguage: true,
            avatarUrl: true,
            role: true,
            createdAt: true,
          },
        });
      }
    } catch {
      user = null;
    }

    if (!user) {
      user = Array.from(mockUsers.values()).find(u => u.id === userId || u.email === req.user?.email);
    }

    if (!user) {
      user = getDemoUser();
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.json(apiResponse(true, 'User profile fetched successfully', userWithoutPassword));
  } catch (error) {
    next(error);
  }
};
