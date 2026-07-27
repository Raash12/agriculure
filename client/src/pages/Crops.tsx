import React, { useState } from 'react';
import { 
  Sprout, 
  Plus, 
  Search, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Wheat,
  Clock
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Crop } from '../types';
import { INITIAL_CROPS } from '../services/api';
import { useToast } from '../context/ToastContext';

export const Crops: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>(INITIAL_CROPS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { showToast } = useToast();

  const [cropName, setCropName] = useState('');
  const [farmerName, setFarmerName] = useState('Abdi Hassan Nur');
  const [category, setCategory] = useState('Oilseed');
  const [season, setSeason] = useState('GU_SPRING');
  const [areaPlantedHa, setAreaPlantedHa] = useState('5.0');
  const [expectedYieldTon, setExpectedYieldTon] = useState('10.0');

  const filteredCrops = crops.filter(c => 
    c.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName) return;

    const newCrop: Crop = {
      id: `crop-${Date.now()}`,
      farmerId: 'f-101',
      farmerName,
      cropName,
      category,
      season,
      areaPlantedHa: parseFloat(areaPlantedHa),
      expectedYieldTon: parseFloat(expectedYieldTon),
      actualYieldTon: null,
      status: 'PLANTED',
      plantingDate: new Date().toISOString().split('T')[0]
    };

    setCrops([newCrop, ...crops]);
    setIsAddModalOpen(false);
    showToast('Crop Registered', `${cropName} registered for ${farmerName}.`, 'success');
  };

  const getStatusBadge = (status: Crop['status']) => {
    switch (status) {
      case 'HARVESTED': return <Badge variant="emerald">HARVESTED</Badge>;
      case 'HARVEST_READY': return <Badge variant="amber">HARVEST READY</Badge>;
      case 'GROWING': return <Badge variant="sky">GROWING</Badge>;
      case 'PLANTED': return <Badge variant="violet">PLANTED</Badge>;
      default: return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Sprout className="w-7 h-7 text-emerald-500" />
            Crop & Harvest Yield Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitor crop seasons, planted area, expected vs actual yield, and harvest dates across Baladweyne.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Register Crop Field</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="bg-gradient-to-tr from-emerald-500/10 to-teal-500/5">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Total Planted Area</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {crops.reduce((sum, c) => sum + c.areaPlantedHa, 0)} Hectares
          </p>
        </Card>
        <Card className="bg-gradient-to-tr from-amber-500/10 to-orange-500/5">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Expected Harvest Yield</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {crops.reduce((sum, c) => sum + c.expectedYieldTon, 0)} Tons
          </p>
        </Card>
        <Card className="bg-gradient-to-tr from-sky-500/10 to-indigo-500/5">
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">Actual Harvested Yield</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {crops.reduce((sum, c) => sum + (c.actualYieldTon || 0), 0).toFixed(1)} Tons
          </p>
        </Card>
      </div>

      {/* Search & List */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter crops by name, category, farmer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Crop Name</th>
                <th className="px-6 py-3.5">Farmer</th>
                <th className="px-6 py-3.5">Season & Category</th>
                <th className="px-6 py-3.5">Planted Area</th>
                <th className="px-6 py-3.5">Expected vs Actual Yield</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Planting Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {filteredCrops.map((crop) => (
                <tr key={crop.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Wheat className="w-4 h-4 text-emerald-500" />
                    {crop.cropName}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                    {crop.farmerName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{crop.season}</span>
                      <span className="text-[10px] text-slate-400">{crop.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    {crop.areaPlantedHa} Ha
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {crop.actualYieldTon !== null && crop.actualYieldTon !== undefined ? `${crop.actualYieldTon} Ton` : 'Pending'}
                      </span>
                      <span className="text-[10px] text-slate-400">Target: {crop.expectedYieldTon} Ton</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(crop.status)}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono">
                    {crop.plantingDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Crop Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Crop Planting Field">
        <form onSubmit={handleCreateCrop} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Crop Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. White Sesame"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Farmer Name *</label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option value="Oilseed">Oilseed</option>
                <option value="Cereal">Cereal</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option value="GU_SPRING">Gu (Spring)</option>
                <option value="DER_AUTUMN">Der (Autumn)</option>
                <option value="XAGAAG_SUMMER">Xagaag (Summer)</option>
                <option value="JILAAL_WINTER">Jilaal (Winter)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Area Planted (Ha)</label>
              <input
                type="number"
                step="0.5"
                value={areaPlantedHa}
                onChange={(e) => setAreaPlantedHa(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Expected Yield (Ton)</label>
              <input
                type="number"
                step="0.5"
                value={expectedYieldTon}
                onChange={(e) => setExpectedYieldTon(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
            >
              Save Crop Field
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
