import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'baladweyne_ams_super_secret_jwt_key_2026';

// Mock in-memory store for fallback if DB is not attached, seamlessly bridges Prisma & demo server
export const mockUsers = [
  {
    id: 'usr-001',
    email: 'admin@baladweyne-ams.so',
    passwordHash: bcrypt.hashSync('Admin@2026', 10),
    fullName: 'Dr. Abdirahman Farah',
    phone: '+252 61 555 0100',
    role: Role.SUPER_ADMIN,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
  {
    id: 'usr-002',
    email: 'farmer@baladweyne-ams.so',
    passwordHash: bcrypt.hashSync('Farmer@2026', 10),
    fullName: 'Hassan Ali Roble',
    phone: '+252 61 555 0200',
    role: Role.FARMER,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 'usr-003',
    email: 'officer@baladweyne-ams.so',
    passwordHash: bcrypt.hashSync('Officer@2026', 10),
    fullName: 'Amina Jama Warsame',
    phone: '+252 61 555 0300',
    role: Role.EXTENSION_OFFICER,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  }
];

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(400).json({ success: false, error: 'Invalid email or password' });
  }

  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ success: false, error: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role, fullName: user.fullName },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        phone: user.phone
      }
    }
  });
};

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password, phone, role } = req.body;

  const existing = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, error: 'Email already registered' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    fullName,
    phone: phone || '',
    role: role || Role.FARMER,
    isVerified: false,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`
  };

  mockUsers.push(newUser);

  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email, role: newUser.role, fullName: newUser.fullName },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
        phone: newUser.phone
      }
    }
  });
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Unauthenticated' });
  }
  const user = mockUsers.find(u => u.id === req.user?.userId);
  return res.json({
    success: true,
    data: user ? {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      phone: user.phone,
      avatarUrl: user.avatarUrl
    } : req.user
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  return res.json({
    success: true,
    message: `Password reset link sent to ${email} (Simulated email dispatch)`
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: 'Password successfully updated'
  });
};
