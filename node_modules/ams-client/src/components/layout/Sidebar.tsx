import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck,
  Sprout, 
  Package, 
  Truck, 
  FileCheck2, 
  CloudRain, 
  TrendingUp, 
  DollarSign, 
  FileSpreadsheet, 
  Settings, 
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Wheat
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'User Management', path: '/users', icon: UserCheck },
    { label: 'Farmers', path: '/farmers', icon: Users },
    { label: 'Crops & Harvest', path: '/crops', icon: Sprout },
    { label: 'Inventory', path: '/inventory', icon: Package },
    { label: 'Resource Requests', path: '/requests', icon: FileCheck2 },
    { label: 'Distribution', path: '/distributions', icon: Truck },
    { label: 'Weather & River Watch', path: '/weather', icon: CloudRain },
    { label: 'Market Prices', path: '/market', icon: TrendingUp },
    { label: 'Finance & Budget', path: '/finance', icon: DollarSign },
    { label: 'Reports & Export', path: '/reports', icon: FileSpreadsheet },
    { label: 'Settings & Security', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col no-print ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20 shrink-0">
            <Wheat className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-none">
                BALADWEYNE
              </span>
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                Agri Cooperative
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-500/20 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* User Role Card */}
      {!collapsed && user && (
        <div className="p-3 m-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldAlert className="w-4 h-4" />
            <span>ROLE: {user.role}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
            {user.fullName}
          </p>
        </div>
      )}
    </aside>
  );
};
