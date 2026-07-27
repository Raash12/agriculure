import React from 'react';
import { 
  Users, 
  Sprout, 
  Package, 
  TrendingUp, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  FileCheck2,
  DollarSign,
  Plus,
  Printer,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const harvestData = [
    { month: 'Jan', Sesame: 4.2, Maize: 6.8, Sorghum: 3.1 },
    { month: 'Feb', Sesame: 5.1, Maize: 7.2, Sorghum: 3.5 },
    { month: 'Mar', Sesame: 7.8, Maize: 8.5, Sorghum: 4.2 },
    { month: 'Apr', Sesame: 9.4, Maize: 10.1, Sorghum: 5.0 },
    { month: 'May', Sesame: 11.2, Maize: 12.4, Sorghum: 6.1 },
    { month: 'Jun', Sesame: 11.8, Maize: 14.2, Sorghum: 7.0 },
  ];

  const cropDistribution = [
    { name: 'Sesame (White)', value: 45, color: '#16a34a' },
    { name: 'Maize (Sorbey)', value: 25, color: '#f59e0b' },
    { name: 'Sorghum', value: 15, color: '#0284c7' },
    { name: 'Watermelon & Veg', value: 15, color: '#14b8a6' },
  ];

  const resourceUsage = [
    { category: 'Drought Seeds', allocated: 2000, distributed: 1450 },
    { category: 'NPK Fertilizer', allocated: 500, distributed: 320 },
    { category: 'Solar Pumps', allocated: 30, distributed: 24 },
    { category: 'Pesticides', allocated: 600, distributed: 400 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Alert - Baladweyne Flood & Weather Status */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
            <CloudRain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Shabelle River Flood Watch - Baladweyne Bridge Station
              </h3>
              <Badge variant="amber">MODERATE WATCH (4.85m)</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Upstream rainfall in the Ethiopian highlands has raised water levels by 0.35m. Canal sluice gates in Bundaweyn and Kooshin sectors are being monitored.
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast('Weather Notification Broadcasted', 'SMS and In-App alerts sent to 1,240 registered farmers.', 'info')}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm shrink-0"
        >
          Broadcast Alert SMS
        </button>
      </div>

      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Executive AMS Overview
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, <span className="font-semibold text-emerald-500">{user?.fullName}</span> ({user?.role}) • Baladweyne Agricultural Cooperative
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => showToast('Export Initialized', 'Downloading Executive Summary PDF...', 'success')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md shadow-emerald-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Export Dashboard</span>
          </button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Registered Farmers
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">1,248</span>
            <span className="flex items-center text-xs font-semibold text-emerald-500">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across 4 district farming sectors</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Cultivated Area
            </span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
              <Sprout className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">3,850 Ha</span>
            <span className="flex items-center text-xs font-semibold text-emerald-500">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +8.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sesame, Maize, Sorghum & Veg</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Harvest Yield (Season)
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">14,280 Tons</span>
            <span className="flex items-center text-xs font-semibold text-emerald-500">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +15.3%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Gu season harvest actuals</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pending Requests
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">18</span>
            <span className="flex items-center text-xs font-semibold text-amber-500">
              Action Required
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Seeds, Fertilizer & Solar Pumps</p>
        </Card>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Harvest Area Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Monthly Harvest Yield Trajectory (Tons)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Comparative production breakdown by principal cash crops
              </p>
            </div>
            <Badge variant="emerald">2026 Season</Badge>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={harvestData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSesame" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMaize" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '12px',
                    color: '#fff' 
                  }} 
                />
                <Area type="monotone" dataKey="Sesame" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorSesame)" />
                <Area type="monotone" dataKey="Maize" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorMaize)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Crop Category Pie Chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Crop Share Breakdown
            </h3>
            <span className="text-xs text-slate-400">By Acreage</span>
          </div>
          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-slate-900 dark:text-white">3,850</span>
              <span className="text-[10px] text-slate-400 font-medium">Total Ha</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {cropDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Resource Usage & Quick Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Distribution Bar Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Cooperative Resource Allocation vs Distribution
            </h3>
            <Badge variant="sky">Inventory Depot A</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUsage} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="allocated" fill="#0284c7" name="Allocated Quota" radius={[6, 6, 0, 0]} />
                <Bar dataKey="distributed" fill="#16a34a" name="Distributed to Farmers" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity Log */}
        <Card>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
            Recent Cooperative Activity
          </h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Sesame Seed Distribution Receipt RCP-2026-0091
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  25kg white sesame issued to Abdi Hassan Nur (Bundaweyn)
                </p>
                <span className="text-[10px] text-slate-500 font-medium">10 mins ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Low Stock Warning: NPK Fertilizer
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  180 bags remaining (Below 200 min safety threshold)
                </p>
                <span className="text-[10px] text-slate-500 font-medium">45 mins ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  New Farmer Profile Registered
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Mohamud Farah Ibrahim added in Howlwadaag sector
                </p>
                <span className="text-[10px] text-slate-500 font-medium">2 hours ago</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
