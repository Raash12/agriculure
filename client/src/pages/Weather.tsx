import React from 'react';
import { 
  CloudRain, 
  AlertTriangle, 
  Sun, 
  Wind, 
  Droplets, 
  Radio, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

export const Weather: React.FC = () => {
  const { showToast } = useToast();

  const weeklyForecast = [
    { day: 'Monday', tempMax: 34, tempMin: 24, condition: 'Sunny', rainProb: 10, icon: Sun },
    { day: 'Tuesday', tempMax: 33, tempMin: 23, condition: 'Cloudy', rainProb: 40, icon: CloudRain },
    { day: 'Wednesday', tempMax: 31, tempMin: 23, condition: 'Heavy Showers', rainProb: 85, icon: CloudRain },
    { day: 'Thursday', tempMax: 32, tempMin: 22, condition: 'Scattered Rain', rainProb: 60, icon: CloudRain },
    { day: 'Friday', tempMax: 33, tempMin: 24, condition: 'Partly Cloudy', rainProb: 20, icon: Sun },
    { day: 'Saturday', tempMax: 35, tempMin: 25, condition: 'Clear Sky', rainProb: 5, icon: Sun },
    { day: 'Sunday', tempMax: 35, tempMin: 25, condition: 'Clear Sky', rainProb: 5, icon: Sun },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <CloudRain className="w-7 h-7 text-sky-500" />
            Baladweyne Weather & River Flood Watch
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time Shabelle River level monitoring (Webi Shabelle) & Gu season emergency alerts.
          </p>
        </div>
        <button
          onClick={() => showToast('Emergency Broadcast Sent', 'SMS warning sent to all farmers near river canals.', 'error')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-500/20"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Dispatch Emergency Alert</span>
        </button>
      </div>

      {/* Shabelle River Gauge Card */}
      <Card className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-slate-900/60 border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="amber" className="text-xs py-1 px-3">MODERATE FLOOD WATCH</Badge>
              <span className="text-xs font-mono text-slate-400">Gauge Station #04 (Baladweyne Bridge)</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Shabelle River Water Level: <span className="text-amber-500 font-mono">4.85 Meters</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
              Water levels are rising at +0.35m/24h due to heavy catchment rainfall in the Ethiopian Highlands. Critical flood breach threshold is 5.50m.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-amber-500/20">
            <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Current Level</span>
              <p className="text-xl font-black text-amber-400 font-mono">4.85 m</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Critical Level</span>
              <p className="text-xl font-black text-rose-500 font-mono">5.50 m</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Parameters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Temperature</span>
            <Sun className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">33°C</p>
          <span className="text-xs text-slate-400 mt-1 block">Feels like 36°C</span>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Expected Rainfall</span>
            <CloudRain className="w-5 h-5 text-sky-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">12.4 mm</p>
          <span className="text-xs text-emerald-500 font-semibold mt-1 block">Optimal for Sesame</span>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Air Humidity</span>
            <Droplets className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">62%</p>
          <span className="text-xs text-slate-400 mt-1 block">Soil moisture index high</span>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Wind Velocity</span>
            <Wind className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">14 km/h</p>
          <span className="text-xs text-slate-400 mt-1 block">South-Easterly breeze</span>
        </Card>
      </div>

      {/* 7-Day Forecast Grid */}
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">7-Day Baladweyne Weather Forecast</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {weeklyForecast.map((fc, idx) => (
            <Card key={fc.day} className={`text-center p-4 ${idx === 2 ? 'ring-2 ring-sky-500 bg-sky-500/10' : ''}`}>
              <span className="text-xs font-bold text-slate-400">{fc.day}</span>
              <fc.icon className="w-6 h-6 mx-auto my-2 text-sky-400" />
              <p className="font-extrabold text-sm text-slate-900 dark:text-white">{fc.tempMax}° / {fc.tempMin}°</p>
              <span className="text-[10px] font-semibold text-sky-400 block mt-1">{fc.rainProb}% Rain</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
