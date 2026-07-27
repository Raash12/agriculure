import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  setRoleOverride: (role: Role) => void;
  isAuthenticated: boolean;
}

const DEFAULT_USER: User = {
  id: 'usr-001',
  fullName: 'Dr. Abdirahman Farah',
  username: 'abdirahman.admin',
  email: 'admin@baladweyne-ams.so',
  phone: '+252 61 555 0100',
  role: 'SUPER_ADMIN',
  status: 'ACTIVE',
  isLocked: false,
  isEmailVerified: true,
  isPhoneVerified: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  lastLogin: '2026-07-27 19:40',
  createdAt: '2026-01-01',
  permissions: ['Full System Access', 'Manage All Users & Roles', 'System Backup & Restore']
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ams_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('ams_token') || 'demo_jwt_token_2026';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ams_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ams_user');
    }
  }, [user]);

  const login = async (email: string, pass: string): Promise<boolean> => {
    const role: Role = email.includes('admin')
      ? 'SUPER_ADMIN'
      : email.includes('officer')
      ? 'EXTENSION_OFFICER'
      : 'FARMER';

    const fullName = email === 'admin@baladweyne-ams.so'
      ? 'Dr. Abdirahman Farah'
      : email === 'officer@baladweyne-ams.so'
      ? 'Amina Jama Warsame'
      : email === 'farmer@baladweyne-ams.so'
      ? 'Hassan Ali Roble'
      : email.split('@')[0].toUpperCase() + ' (AMS User)';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName,
      username: email.split('@')[0],
      email,
      phone: '+252 61 555 0000',
      role,
      status: 'ACTIVE',
      isLocked: false,
      isEmailVerified: true,
      isPhoneVerified: true,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 16),
      createdAt: new Date().toISOString().split('T')[0],
      permissions: ['View Dashboard']
    };

    const newToken = 'demo_token_' + Date.now();
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem('ams_token', newToken);
    localStorage.setItem('ams_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ams_token');
    localStorage.removeItem('ams_user');
  };

  const setRoleOverride = (role: Role) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setRoleOverride, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
