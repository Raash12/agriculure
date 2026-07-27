import React from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Database, 
  History, 
  Lock, 
  UserCheck,
  Check,
  X,
  Download,
  Upload
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();

  const rolePermissions = [
    { module: 'Farmer Directory', superAdmin: true, admin: true, officer: true, inventory: false, farmer: false, viewer: false },
    { module: 'Crop & Harvest Yield', superAdmin: true, admin: true, officer: true, inventory: false, farmer: true, viewer: false },
    { module: 'Inventory Stock In/Out', superAdmin: true, admin: true, officer: false, inventory: true, farmer: false, viewer: false },
    { module: 'Approve Resource Requests', superAdmin: true, admin: true, officer: true, inventory: true, farmer: false, viewer: false },
    { module: 'Financial Ledger & Budget', superAdmin: true, admin: true, officer: false, inventory: false, farmer: false, viewer: false },
    { module: 'System Backup & Security Logs', superAdmin: true, admin: false, officer: false, inventory: false, farmer: false, viewer: false },
  ];

  const auditLogs = [
    { id: 'log-01', action: 'CREATE_FARMER', user: 'Dr. Abdirahman Farah (SUPER_ADMIN)', module: 'FARMER', ip: '197.220.89.12', time: '10 mins ago', details: 'Registered farmer Abdi Hassan Nur in Bundaweyn' },
    { id: 'log-02', action: 'APPROVE_RESOURCE', user: 'Amina Jama Warsame (EXTENSION_OFFICER)', module: 'REQUEST', ip: '197.220.89.14', time: '45 mins ago', details: 'Approved request req-202 for Solar Irrigation Pump' },
    { id: 'log-03', action: 'STOCK_OUT', user: 'Dr. Abdirahman Farah (SUPER_ADMIN)', module: 'INVENTORY', ip: '197.220.89.12', time: '2 hours ago', details: 'Dispatched 25kg Sesame seeds with receipt RCP-2026-0091' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-emerald-500" />
          Settings, Role Permissions & Audit Security
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage RBAC permissions matrix, trigger database backups, and inspect system audit logs.
        </p>
      </div>

      {/* Database Backup & Restore */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-6 h-6 text-emerald-400" />
            <h3 className="font-extrabold text-sm">PostgreSQL System Backup</h3>
          </div>
          <p className="text-xs text-slate-300">
            Create an encrypted SQL dump backup of farmers, crops, inventory, and transaction tables.
          </p>
          <button
            onClick={() => showToast('Backup Created', 'Database snapshot saved to ams_backup_2026.sql', 'success')}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-4 h-4" /> Create Database Backup
          </button>
        </Card>

        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-sky-400" />
            <h3 className="font-extrabold text-sm">System Restore & Migration</h3>
          </div>
          <p className="text-xs text-slate-300">
            Restore system state from a verified backup archive or run Prisma database migrations.
          </p>
          <button
            onClick={() => showToast('System State Verified', 'Prisma Schema & Models up to date.', 'info')}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" /> Restore System Archive
          </button>
        </Card>
      </div>

      {/* Role Permission Matrix */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            Role-Based Access Control (RBAC) Permissions Matrix
          </h3>
          <Badge variant="emerald">6 ACTIVE ROLES</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">System Module</th>
                <th className="px-4 py-3.5 text-center">Super Admin</th>
                <th className="px-4 py-3.5 text-center">Admin</th>
                <th className="px-4 py-3.5 text-center">Ext. Officer</th>
                <th className="px-4 py-3.5 text-center">Inventory Off.</th>
                <th className="px-4 py-3.5 text-center">Farmer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {rolePermissions.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{row.module}</td>
                  <td className="px-4 py-4 text-center">{row.superAdmin ? <Check className="w-4 h-4 mx-auto text-emerald-500 font-bold" /> : <X className="w-4 h-4 mx-auto text-rose-500" />}</td>
                  <td className="px-4 py-4 text-center">{row.admin ? <Check className="w-4 h-4 mx-auto text-emerald-500 font-bold" /> : <X className="w-4 h-4 mx-auto text-rose-500" />}</td>
                  <td className="px-4 py-4 text-center">{row.officer ? <Check className="w-4 h-4 mx-auto text-emerald-500 font-bold" /> : <X className="w-4 h-4 mx-auto text-rose-500" />}</td>
                  <td className="px-4 py-4 text-center">{row.inventory ? <Check className="w-4 h-4 mx-auto text-emerald-500 font-bold" /> : <X className="w-4 h-4 mx-auto text-rose-500" />}</td>
                  <td className="px-4 py-4 text-center">{row.farmer ? <Check className="w-4 h-4 mx-auto text-emerald-500 font-bold" /> : <X className="w-4 h-4 mx-auto text-rose-500" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Audit Logs Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-4 h-4 text-sky-500" />
            System Audit & Activity Logs
          </h3>
          <span className="text-xs text-slate-400 font-mono">Real-time Stream</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Action</th>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Details</th>
                <th className="px-6 py-3.5">IP Address</th>
                <th className="px-6 py-3.5">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-6 py-4">
                    <Badge variant="emerald" className="font-mono text-[10px]">
                      {log.action}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{log.user}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{log.details}</td>
                  <td className="px-6 py-4 font-mono text-slate-400">{log.ip}</td>
                  <td className="px-6 py-4 text-slate-400">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
