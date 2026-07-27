import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Search, 
  Bell, 
  LogOut, 
  UserCheck, 
  CloudRain, 
  ShieldCheck, 
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, setRoleOverride } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const rolesList: Role[] = [
    'SUPER_ADMIN',
    'ADMINISTRATOR',
    'FARMER',
    'EXTENSION_OFFICER',
    'INVENTORY_OFFICER',
    'VIEWER'
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between no-print">
      {/* Global Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Global search farmers, crops, inventory, receipt #..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Baladweyne River Level Quick Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
          <CloudRain className="w-4 h-4 animate-pulse" />
          <span>Shabelle River: 4.85m (Watch)</span>
        </div>

        {/* Role Switcher Demo Dropdown */}
        <div className="relative">
          <select
            value={user?.role || 'SUPER_ADMIN'}
            onChange={(e) => setRoleOverride(e.target.value as Role)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 focus:outline-none cursor-pointer"
          >
            {rolesList.map(r => (
              <option key={r} value={r} className="bg-slate-900 text-white">
                Role: {r}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Light/Dark Mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
                <h4 className="font-bold text-sm">Notifications (3)</h4>
                <span className="text-[10px] text-emerald-500 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  <p className="font-semibold">⚠️ Shabelle River Level Warning</p>
                  <p className="text-[11px] opacity-80 mt-0.5">Water level reached 4.85m near Bundaweyn gauge.</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <p className="font-semibold">✅ Request Approved</p>
                  <p className="text-[11px] opacity-80 mt-0.5">Solar pump request for Fadumo Omar approved.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-800 dark:text-slate-200">
              {user?.fullName.split(' ')[0]}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-2xl z-50">
              <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.fullName}</p>
                <p className="text-[11px] text-slate-400">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
