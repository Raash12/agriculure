import React, { useState } from 'react';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Key, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Phone, 
  Calendar, 
  Download, 
  Printer, 
  UserCheck, 
  UserX,
  History,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { User, Role, UserStatus, LoginHistoryItem } from '../types';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const UsersPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();

  const [usersList, setUsersList] = useState<User[]>([
    {
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
      permissions: ['Full System Access', 'Manage All Users & Roles', 'System Backup & Restore', 'Audit Logs']
    },
    {
      id: 'usr-002',
      fullName: 'Amina Jama Warsame',
      username: 'amina.officer',
      email: 'officer@baladweyne-ams.so',
      phone: '+252 61 555 0300',
      role: 'AGRICULTURAL_OFFICER',
      status: 'ACTIVE',
      isLocked: false,
      isEmailVerified: true,
      isPhoneVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      lastLogin: '2026-07-27 18:15',
      createdAt: '2026-02-10',
      permissions: ['Register Farmers', 'Manage Crops', 'Publish Weather Alerts', 'Publish Market Prices']
    },
    {
      id: 'usr-003',
      fullName: 'Hassan Ali Roble',
      username: 'hassan.farmer',
      email: 'farmer@baladweyne-ams.so',
      phone: '+252 61 555 0200',
      role: 'FARMER',
      status: 'ACTIVE',
      isLocked: false,
      isEmailVerified: true,
      isPhoneVerified: false,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      lastLogin: '2026-07-26 14:20',
      createdAt: '2026-03-05',
      permissions: ['Submit Crop Info', 'Request Inputs', 'View Weather & Market Prices']
    },
    {
      id: 'usr-004',
      fullName: 'Mohamed Osman Elmi',
      username: 'mohamed.admin',
      email: 'mohamed@baladweyne-ams.so',
      phone: '+252 61 888 1234',
      role: 'ADMINISTRATOR',
      status: 'ACTIVE',
      isLocked: false,
      isEmailVerified: true,
      isPhoneVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      lastLogin: '2026-07-25 09:30',
      createdAt: '2026-02-01',
      permissions: ['Manage Farmers', 'Manage Inventory', 'Approve Requests', 'View Analytics']
    },
    {
      id: 'usr-005',
      fullName: 'Sahra Hussein Adan',
      username: 'sahra.farmer',
      email: 'sahra@baladweyne-ams.so',
      phone: '+252 61 999 4411',
      role: 'FARMER',
      status: 'SUSPENDED',
      isLocked: true,
      isEmailVerified: false,
      isPhoneVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      lastLogin: '2026-06-12 11:00',
      createdAt: '2026-04-10',
      permissions: ['Submit Crop Info', 'View Weather']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(null);
  const [selectedUserEdit, setSelectedUserEdit] = useState<User | null>(null);
  const [selectedUserResetPwd, setSelectedUserResetPwd] = useState<User | null>(null);

  // Form inputs for Create/Edit
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<Role>('FARMER');
  const [password, setPassword] = useState('Default@2026');
  const [newPasswordReset, setNewPasswordReset] = useState('Reset@2026');

  // Filter & Search Logic
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = 
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !username || !email) {
      showToast('Validation Error', 'Full Name, Username, and Email are required.', 'error');
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName,
      username,
      email,
      phone: phone || '+252 61 000 0000',
      role,
      status: 'ACTIVE',
      isLocked: false,
      isEmailVerified: true,
      isPhoneVerified: true,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0],
      permissions: getRolePermissions(role)
    };

    setUsersList([newUser, ...usersList]);
    setIsAddModalOpen(false);
    showToast('User Created', `${fullName} (${role}) added successfully.`, 'success');

    // Reset Form
    setFullName('');
    setUsername('');
    setEmail('');
    setPhone('');
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserEdit) return;

    setUsersList(usersList.map(u => {
      if (u.id === selectedUserEdit.id) {
        return {
          ...u,
          fullName: selectedUserEdit.fullName,
          email: selectedUserEdit.email,
          phone: selectedUserEdit.phone,
          role: selectedUserEdit.role,
          permissions: getRolePermissions(selectedUserEdit.role)
        };
      }
      return u;
    }));

    showToast('User Updated', `${selectedUserEdit.fullName} details updated.`, 'success');
    setSelectedUserEdit(null);
  };

  const handleToggleStatus = (user: User) => {
    const nextStatus: UserStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setUsersList(usersList.map(u => u.id === user.id ? { ...u, status: nextStatus } : u));
    showToast('Status Updated', `${user.fullName} is now ${nextStatus}.`, 'info');
  };

  const handleToggleLock = (user: User) => {
    setUsersList(usersList.map(u => u.id === user.id ? { ...u, isLocked: !u.isLocked } : u));
    showToast('Account Lock Updated', `${user.fullName} account ${user.isLocked ? 'Unlocked' : 'Locked'}.`, 'warning');
  };

  const handleDeleteUser = (user: User) => {
    if (user.role === 'SUPER_ADMIN') {
      showToast('Action Denied', 'Super Admin accounts cannot be deleted.', 'error');
      return;
    }
    if (confirm(`Are you sure you want to delete user account for ${user.fullName}?`)) {
      setUsersList(usersList.filter(u => u.id !== user.id));
      showToast('User Deleted', `${user.fullName} account deleted.`, 'info');
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserResetPwd) return;

    showToast('Password Reset', `Password for ${selectedUserResetPwd.fullName} reset to: ${newPasswordReset}`, 'success');
    setSelectedUserResetPwd(null);
  };

  function getRolePermissions(role: Role): string[] {
    switch (role) {
      case 'SUPER_ADMIN':
        return ['Full System Access', 'Manage All Users & Roles', 'Configure Settings', 'Database Backup & Restore', 'Audit Logs'];
      case 'ADMINISTRATOR':
        return ['Manage Farmers & Officers', 'Manage Crops & Inventory', 'Approve Resource Requests', 'Generate Reports'];
      case 'AGRICULTURAL_OFFICER':
      case 'EXTENSION_OFFICER':
        return ['Register Farmers', 'Manage Crop Records', 'Publish Weather Alerts', 'Publish Market Prices'];
      case 'FARMER':
        return ['View Personal Profile', 'Submit Crop Information', 'Request Resources', 'View Weather & Market Alerts'];
      default:
        return ['View Basic Information'];
    }
  }

  const getRoleBadgeVariant = (role: Role) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'violet';
      case 'ADMINISTRATOR': return 'sky';
      case 'AGRICULTURAL_OFFICER':
      case 'EXTENSION_OFFICER': return 'emerald';
      case 'FARMER': return 'amber';
      default: return 'slate';
    }
  };

  const mockLoginHistory: LoginHistoryItem[] = [
    { id: 'lh-1', ipAddress: '197.220.89.12', device: 'Chrome on Windows 11', timestamp: '2026-07-27 19:40', status: 'SUCCESS' },
    { id: 'lh-2', ipAddress: '197.220.89.14', device: 'Safari on iPhone 15', timestamp: '2026-07-25 10:15', status: 'SUCCESS' },
    { id: 'lh-3', ipAddress: '41.220.10.4', device: 'Firefox on Android', timestamp: '2026-07-20 08:30', status: 'FAILED' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <UsersIcon className="w-7 h-7 text-emerald-500" />
            User Management & RBAC Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage user accounts, roles (Super Admin, Admin, Agricultural Officer, Farmer), lock states, and security permissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Roster</span>
          </button>
          <button
            onClick={() => showToast('Export Initialized', 'Downloading User Accounts to Excel (.xlsx)', 'success')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Excel Export</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md shadow-emerald-500/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create New User</span>
          </button>
        </div>
      </div>

      {/* Role Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-tr from-violet-500/10 to-indigo-500/5">
          <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase">Super Admins</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {usersList.filter(u => u.role === 'SUPER_ADMIN').length}
          </p>
        </Card>
        <Card className="bg-gradient-to-tr from-sky-500/10 to-blue-500/5">
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">Administrators</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {usersList.filter(u => u.role === 'ADMINISTRATOR').length}
          </p>
        </Card>
        <Card className="bg-gradient-to-tr from-emerald-500/10 to-teal-500/5">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Agricultural Officers</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {usersList.filter(u => u.role === 'AGRICULTURAL_OFFICER' || u.role === 'EXTENSION_OFFICER').length}
          </p>
        </Card>
        <Card className="bg-gradient-to-tr from-amber-500/10 to-orange-500/5">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Farmers</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {usersList.filter(u => u.role === 'FARMER').length}
          </p>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search user name, username, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="w-4 h-4" />
              <span>Role:</span>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMINISTRATOR">Administrator</option>
              <option value="AGRICULTURAL_OFFICER">Agricultural Officer</option>
              <option value="FARMER">Farmer</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-2">
              <span>Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Data Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">User Profile</th>
                <th className="px-6 py-3.5">Username & Email</th>
                <th className="px-6 py-3.5">Phone Number</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Account Status</th>
                <th className="px-6 py-3.5">Last Login</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={user.avatarUrl}
                          alt={user.fullName}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                        />
                        {user.isLocked && (
                          <div className="absolute -top-1 -right-1 p-0.5 rounded-full bg-rose-500 text-white" title="Account Locked">
                            <Lock className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {user.fullName}
                          {user.isEmailVerified && (
                            <span title="Verified User">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            </span>
                          )}
                        </p>
                        <span className="text-[10px] text-slate-400">Created: {user.createdAt}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-slate-800 dark:text-slate-200">@{user.username}</span>
                      <span className="text-[11px] text-slate-400">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={user.status === 'ACTIVE' ? 'emerald' : user.status === 'SUSPENDED' ? 'rose' : 'slate'}>
                        {user.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedUserDetail(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                        title="View Profile Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedUserEdit(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-500/10 transition-colors"
                        title="Edit User Role & Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedUserResetPwd(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                        title="Reset Password"
                      >
                        <Key className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          user.status === 'ACTIVE'
                            ? 'text-slate-400 hover:text-rose-500 hover:bg-rose-500/10'
                            : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10'
                        }`}
                        title={user.status === 'ACTIVE' ? 'Deactivate User' : 'Activate User'}
                      >
                        {user.status === 'ACTIVE' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleToggleLock(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
                        title={user.isLocked ? 'Unlock Account' : 'Lock Account'}
                      >
                        {user.isLocked ? <Unlock className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold">{currentPage} / {totalPages || 1}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Create User Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New System User Account">
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Farah Roble"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Username *</label>
              <input
                type="text"
                required
                placeholder="e.g. farah.admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. farah@baladweyne-ams.so"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="e.g. +252 61 555 9900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Assigned Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMINISTRATOR">Administrator</option>
                <option value="AGRICULTURAL_OFFICER">Agricultural Officer</option>
                <option value="FARMER">Farmer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Initial Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
            >
              Create Account
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      {selectedUserEdit && (
        <Modal
          isOpen={!!selectedUserEdit}
          onClose={() => setSelectedUserEdit(null)}
          title={`Edit User: ${selectedUserEdit.fullName}`}
        >
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={selectedUserEdit.fullName}
                onChange={(e) => setSelectedUserEdit({ ...selectedUserEdit, fullName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Email Address</label>
              <input
                type="email"
                required
                value={selectedUserEdit.email}
                onChange={(e) => setSelectedUserEdit({ ...selectedUserEdit, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Phone Number</label>
              <input
                type="text"
                value={selectedUserEdit.phone}
                onChange={(e) => setSelectedUserEdit({ ...selectedUserEdit, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Role</label>
              <select
                value={selectedUserEdit.role}
                onChange={(e) => setSelectedUserEdit({ ...selectedUserEdit, role: e.target.value as Role })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMINISTRATOR">Administrator</option>
                <option value="AGRICULTURAL_OFFICER">Agricultural Officer</option>
                <option value="FARMER">Farmer</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedUserEdit(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Reset Password Modal */}
      {selectedUserResetPwd && (
        <Modal
          isOpen={!!selectedUserResetPwd}
          onClose={() => setSelectedUserResetPwd(null)}
          title={`Reset Password for ${selectedUserResetPwd.fullName}`}
        >
          <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1">Enter New Password</label>
              <input
                type="text"
                required
                value={newPasswordReset}
                onChange={(e) => setNewPasswordReset(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedUserResetPwd(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white"
              >
                Confirm Reset
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View User Detail Modal */}
      {selectedUserDetail && (
        <Modal
          isOpen={!!selectedUserDetail}
          onClose={() => setSelectedUserDetail(null)}
          title={`User Profile & Security Logs: ${selectedUserDetail.fullName}`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <img
                src={selectedUserDetail.avatarUrl}
                alt={selectedUserDetail.fullName}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-500/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{selectedUserDetail.fullName}</h3>
                  <Badge variant={getRoleBadgeVariant(selectedUserDetail.role)}>{selectedUserDetail.role}</Badge>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">@{selectedUserDetail.username} • {selectedUserDetail.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={selectedUserDetail.status === 'ACTIVE' ? 'emerald' : 'slate'}>{selectedUserDetail.status}</Badge>
                  {selectedUserDetail.isLocked && <Badge variant="rose">LOCKED</Badge>}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase mb-2 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-500" />
                Assigned RBAC Permissions
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(selectedUserDetail.permissions || getRolePermissions(selectedUserDetail.role)).map(perm => (
                  <Badge key={perm} variant="emerald" className="text-[11px] py-1 px-2.5">
                    ✓ {perm}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase mb-2 flex items-center gap-1.5">
                <History className="w-4 h-4 text-sky-500" />
                Recent Login Security History
              </h4>
              <div className="space-y-2 text-xs">
                {mockLoginHistory.map(lh => (
                  <div key={lh.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{lh.ipAddress}</span>
                      <span className="text-[11px] text-slate-400 block">{lh.device}</span>
                    </div>
                    <div className="text-right">
                      <Badge variant={lh.status === 'SUCCESS' ? 'emerald' : 'rose'}>{lh.status}</Badge>
                      <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{lh.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
