import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  Store, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const Market: React.FC = () => {
  const priceTrendData = [
    { month: 'Jan', Sesame: 1.80, Maize: 0.60, Watermelon: 0.35 },
    { month: 'Feb', Sesame: 1.85, Maize: 0.62, Watermelon: 0.38 },
    { month: 'Mar', Sesame: 1.90, Maize: 0.65, Watermelon: 0.40 },
    { month: 'Apr', Sesame: 1.95, Maize: 0.70, Watermelon: 0.38 },
    { month: 'May', Sesame: 2.05, Maize: 0.68, Watermelon: 0.39 },
    { month: 'Jun', Sesame: 2.10, Maize: 0.65, Watermelon: 0.40 },
  ];

  const marketPrices = [
    {
      id: 'mkt-01',
      cropName: 'Sesame (White Quality A)',
      marketName: 'Baladweyne Main Market',
      pricePerKgUSD: 2.10,
      prevPriceUSD: 1.95,
      trend: 'UP',
      demand: 'HIGH',
      recommendedMarket: 'Mogadishu Export Hub'
    },
    {
      id: 'mkt-02',
      cropName: 'Maize (Local Dry)',
      marketName: 'Baladweyne Main Market',
      pricePerKgUSD: 0.65,
      prevPriceUSD: 0.70,
      trend: 'DOWN',
      demand: 'MEDIUM',
      recommendedMarket: 'Cooperative Central Silo'
    },
    {
      id: 'mkt-03',
      cropName: 'Watermelon (Fresh Harvest)',
      marketName: 'Howlwadaag Fresh Yard',
      pricePerKgUSD: 0.40,
      prevPriceUSD: 0.38,
      trend: 'UP',
      demand: 'HIGH',
      recommendedMarket: 'Local Retail Vendors'
    },
    {
      id: 'mkt-04',
      cropName: 'Red Tomatoes',
      marketName: 'Kooshin Wholesale Yard',
      pricePerKgUSD: 0.85,
      prevPriceUSD: 0.85,
      trend: 'STABLE',
      demand: 'HIGH',
      recommendedMarket: 'Jowhar Trade Processing Center'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-emerald-500" />
          Agricultural Market Prices & Trends
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Daily commodity prices, demand levels, and trade destination recommendations for cooperative crops.
        </p>
      </div>

      {/* Price Trends Chart */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Historical Crop Commodity Prices ($/kg)</h3>
            <p className="text-xs text-slate-400 mt-0.5">6-month price movement across Baladweyne wholesale markets</p>
          </div>
          <Badge variant="emerald">UPDATED TODAY</Badge>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="Sesame" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Maize" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Watermelon" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Market Prices Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Crop Commodity</th>
                <th className="px-6 py-3.5">Market Name</th>
                <th className="px-6 py-3.5">Price / kg</th>
                <th className="px-6 py-3.5">Trend</th>
                <th className="px-6 py-3.5">Market Demand</th>
                <th className="px-6 py-3.5">Best Sale Destination</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {marketPrices.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                    {item.cropName}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {item.marketName}
                  </td>
                  <td className="px-6 py-4 font-black text-emerald-500 text-sm">
                    ${item.pricePerKgUSD.toFixed(2)} USD
                  </td>
                  <td className="px-6 py-4">
                    {item.trend === 'UP' && (
                      <span className="flex items-center text-emerald-500 font-bold text-xs">
                        <ArrowUpRight className="w-4 h-4 mr-0.5" /> +{((item.pricePerKgUSD - (item.prevPriceUSD || 0)) / (item.prevPriceUSD || 1) * 100).toFixed(1)}%
                      </span>
                    )}
                    {item.trend === 'DOWN' && (
                      <span className="flex items-center text-rose-500 font-bold text-xs">
                        <ArrowDownRight className="w-4 h-4 mr-0.5" /> -3.2%
                      </span>
                    )}
                    {item.trend === 'STABLE' && (
                      <span className="flex items-center text-slate-400 font-bold text-xs">
                        <Minus className="w-4 h-4 mr-0.5" /> Stable
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={item.demand === 'HIGH' ? 'emerald' : 'sky'}>
                      {item.demand} DEMAND
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Store className="w-3.5 h-3.5 text-emerald-500" />
                    {item.recommendedMarket}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
