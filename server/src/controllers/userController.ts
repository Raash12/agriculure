import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Role } from '../types';

export interface UserRecord {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: Role;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  isLocked: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  avatarUrl: string;
  lastLogin: string;
  createdAt: string;
  passwordHash: string;
  permissions: string[];
}

export let mockUserDatabase: UserRecord[] = [
  {
    id: 'usr-001',
    fullName: 'Dr. Abdirahman Farah',
    username: 'abdirahman.admin',
    email: 'admin@baladweyne-ams.so',
    phone: '+252 61 555 0100',
    role: Role.SUPER_ADMIN,
    status: 'ACTIVE',
    isLocked: false,
    isEmailVerified: true,
    isPhoneVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    lastLogin: '2026-07-27 19:40',
    createdAt: '2026-01-01',
    passwordHash: bcrypt.hashSync('Admin@2026', 10),
    permissions: ['ALL_SYSTEM_ACCESS', 'USER_MANAGEMENT', 'SYSTEM_BACKUP', 'AUDIT_LOGS']
  },
  {
    id: 'usr-002',
    fullName: 'Amina Jama Warsame',
    username: 'amina.officer',
    email: 'officer@baladweyne-ams.so',
    phone: '+252 61 555 0300',
    role: Role.EXTENSION_OFFICER,
    status: 'ACTIVE',
    isLocked: false,
    isEmailVerified: true,
    isPhoneVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    lastLogin: '2026-07-27 18:15',
    createdAt: '2026-02-10',
    passwordHash: bcrypt.hashSync('Officer@2026', 10),
    permissions: ['REGISTER_FARMERS', 'MANAGE_CROPS', 'PUBLISH_WEATHER', 'PUBLISH_MARKET']
  },
  {
    id: 'usr-003',
    fullName: 'Hassan Ali Roble',
    username: 'hassan.farmer',
    email: 'farmer@baladweyne-ams.so',
    phone: '+252 61 555 0200',
    role: Role.FARMER,
    status: 'ACTIVE',
    isLocked: false,
    isEmailVerified: true,
    isPhoneVerified: false,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    lastLogin: '2026-07-26 14:20',
    createdAt: '2026-03-05',
    passwordHash: bcrypt.hashSync('Farmer@2026', 10),
    permissions: ['VIEW_PROFILE', 'SUBMIT_CROPS', 'REQUEST_RESOURCE', 'VIEW_WEATHER']
  },
  {
    id: 'usr-004',
    fullName: 'Mohamed Osman Elmi',
    username: 'mohamed.admin',
    email: 'mohamed@baladweyne-ams.so',
    phone: '+252 61 888 1234',
    role: Role.ADMINISTRATOR,
    status: 'ACTIVE',
    isLocked: false,
    isEmailVerified: true,
    isPhoneVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    lastLogin: '2026-07-25 09:30',
    createdAt: '2026-02-01',
    passwordHash: bcrypt.hashSync('Admin@2026', 10),
    permissions: ['MANAGE_FARMERS', 'MANAGE_INVENTORY', 'APPROVE_REQUESTS', 'REPORTS']
  }
];

export const getUsers = async (req: Request, res: Response) => {
  const { search, role, status } = req.query;

  let filtered = [...mockUserDatabase];

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(u =>
      u.fullName.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q)
    );
  }

  if (role && role !== 'ALL') {
    filtered = filtered.filter(u => u.role === String(role));
  }

  if (status && status !== 'ALL') {
    filtered = filtered.filter(u => u.status === String(status));
  }

  return res.json({
    success: true,
    data: filtered.map(u => ({
      id: u.id,
      fullName: u.fullName,
      username: u.username,
      email: u.email,
      phone: u.phone,
      role: u.role,
      status: u.status,
      isLocked: u.isLocked,
      isEmailVerified: u.isEmailVerified,
      isPhoneVerified: u.isPhoneVerified,
      avatarUrl: u.avatarUrl,
      lastLogin: u.lastLogin,
      createdAt: u.createdAt,
      permissions: u.permissions
    }))
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { fullName, username, email, phone, role, password } = req.body;

  const existing = mockUserDatabase.find(u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, error: 'Email or Username already exists' });
  }

  const newUser: UserRecord = {
    id: `usr-${Date.now()}`,
    fullName,
    username,
    email,
    phone: phone || '',
    role: role || Role.FARMER,
    status: 'ACTIVE',
    isLocked: false,
    isEmailVerified: true,
    isPhoneVerified: true,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    lastLogin: 'Never',
    createdAt: new Date().toISOString().split('T')[0],
    passwordHash: bcrypt.hashSync(password || 'Default@2026', 10),
    permissions: ['VIEW_PROFILE']
  };

  mockUserDatabase.unshift(newUser);
  return res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = mockUserDatabase.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  Object.assign(user, req.body);
  return res.json({ success: true, message: 'User updated successfully', data: user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const index = mockUserDatabase.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  mockUserDatabase.splice(index, 1);
  return res.json({ success: true, message: 'User deleted' });
};

export const toggleUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = mockUserDatabase.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  user.status = status;
  return res.json({ success: true, message: `User status changed to ${status}`, data: user });
};

export const toggleUserLock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = mockUserDatabase.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  user.isLocked = !user.isLocked;
  return res.json({ success: true, message: `User ${user.isLocked ? 'locked' : 'unlocked'}`, data: user });
};

export const resetUserPassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  const user = mockUserDatabase.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  user.passwordHash = bcrypt.hashSync(newPassword || 'Reset@2026', 10);
  return res.json({ success: true, message: 'Password reset successfully' });
};

export const getAuditLogs = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: [
      {
        id: 'log-01',
        action: 'CREATE_USER',
        module: 'USER_MANAGEMENT',
        user: 'Dr. Abdirahman Farah (SUPER_ADMIN)',
        ipAddress: '197.220.89.12',
        details: 'Created new Agricultural Officer account: Amina Jama Warsame',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
      },
      {
        id: 'log-02',
        action: 'TOGGLE_STATUS',
        module: 'USER_MANAGEMENT',
        user: 'Dr. Abdirahman Farah (SUPER_ADMIN)',
        ipAddress: '197.220.89.12',
        details: 'Activated user account: Hassan Ali Roble',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ]
  });
};
