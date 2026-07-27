import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Eye, 
  Edit3, 
  Trash2, 
  Wheat,
  ExternalLink
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Farmer } from '../types';
import { INITIAL_FARMERS } from '../services/api';
import { useToast } from '../context/ToastContext';

export const Farmers: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>(INITIAL_FARMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const { showToast } = useToast();

  // Form states for new farmer
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Bundaweyn');
  const [farmSize, setFarmSize] = useState('5.0');
  const [cropTypes, setCropTypes] = useState('Sesame, Maize');

  const filteredFarmers = farmers.filter(f => {
    const matchesSearch = 
      f.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.nationalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.phone.includes(searchTerm) ||
      f.village.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVillage = selectedVillage === 'ALL' || f.village === selectedVillage;
    const matchesStatus = selectedStatus === 'ALL' || f.status === selectedStatus;

    return matchesSearch && matchesVillage && matchesStatus;
  });

  const handleAddFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nationalId || !phone) {
      showToast('Validation Error', 'Please fill in all required fields.', 'error');
      return;
    }

    const newFarmer: Farmer = {
      id: `f-${Date.now()}`,
      fullName,
      nationalId,
      phone,
      village,
      district: 'Baladweyne',
      farmSizeHectares: parseFloat(farmSize) || 1.0,
      latitude: 4.735,
      longitude: 45.205,
      status: 'ACTIVE',
      cropTypes: cropTypes.split(',').map(s => s.trim()),
      photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setFarmers([newFarmer, ...farmers]);
    setIsAddModalOpen(false);
    showToast('Farmer Registered', `${fullName} was successfully registered.`, 'success');

    // Reset form
    setFullName('');
    setNationalId('');
    setPhone('');
  };

  const handleDeleteFarmer = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete farmer record for ${name}?`)) {
      setFarmers(farmers.filter(f => f.id !== id));
      showToast('Farmer Removed', `${name} record soft deleted.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-500" />
            Farmer Directory & Registry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage cooperative farmer profiles, national IDs, GPS farm bounds, and crop history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print List</span>
          </button>
          <button
            onClick={() => showToast('Export Started', 'Exporting Farmer Registry to Excel (.xlsx)', 'success')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Excel Export</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Register Farmer</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, National ID, village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="w-4 h-4" />
              <span>Village:</span>
            </div>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="ALL">All Villages</option>
              <option value="Bundaweyn">Bundaweyn</option>
              <option value="Kooshin">Kooshin</option>
              <option value="Howlwadaag">Howlwadaag</option>
              <option value="Kawaali">Kawaali</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Farmers Data Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Farmer Profile</th>
                <th className="px-6 py-3.5">National ID</th>
                <th className="px-6 py-3.5">Village & GPS</th>
                <th className="px-6 py-3.5">Farm Size</th>
                <th className="px-6 py-3.5">Active Crops</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {filteredFarmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={farmer.photoUrl}
                        alt={farmer.fullName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{farmer.fullName}</p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {farmer.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-300">
                    {farmer.nationalId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{farmer.village}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-500" />
                        {farmer.latitude}, {farmer.longitude}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    {farmer.farmSizeHectares} Ha
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {farmer.cropTypes.map(c => (
                        <Badge key={c} variant="emerald" className="text-[10px]">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={farmer.status === 'ACTIVE' ? 'emerald' : 'slate'}>
                      {farmer.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedFarmer(farmer)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFarmer(farmer.id, farmer.fullName)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete Record"
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
      </Card>

      {/* Add Farmer Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Cooperative Farmer">
        <form onSubmit={handleAddFarmer} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ali Hassan Farah"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">National ID Number *</label>
              <input
                type="text"
                required
                placeholder="e.g. SO-8812903"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
              <input
                type="text"
                required
                placeholder="e.g. +252 61 555 1234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Village Sector</label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="Bundaweyn">Bundaweyn</option>
                <option value="Kooshin">Kooshin</option>
                <option value="Howlwadaag">Howlwadaag</option>
                <option value="Kawaali">Kawaali</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Farm Size (Hectares)</label>
              <input
                type="number"
                step="0.5"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Crops</label>
              <input
                type="text"
                placeholder="e.g. Sesame, Maize"
                value={cropTypes}
                onChange={(e) => setCropTypes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
            >
              Save Farmer Profile
            </button>
          </div>
        </form>
      </Modal>

      {/* View Farmer Detail Modal */}
      {selectedFarmer && (
        <Modal
          isOpen={!!selectedFarmer}
          onClose={() => setSelectedFarmer(null)}
          title={`Farmer Profile: ${selectedFarmer.fullName}`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <img
                src={selectedFarmer.photoUrl}
                alt={selectedFarmer.fullName}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-500/20"
              />
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{selectedFarmer.fullName}</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">National ID: {selectedFarmer.nationalId}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="emerald">{selectedFarmer.status}</Badge>
                  <span className="text-xs text-slate-400">• Registered {selectedFarmer.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Phone Number</span>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{selectedFarmer.phone}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Location & District</span>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{selectedFarmer.village}, {selectedFarmer.district}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Total Farm Size</span>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{selectedFarmer.farmSizeHectares} Hectares</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">GPS Coordinates</span>
                <p className="font-bold text-emerald-500 font-mono mt-1">{selectedFarmer.latitude}, {selectedFarmer.longitude}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase mb-2">Registered Crop Types</h4>
              <div className="flex flex-wrap gap-2">
                {selectedFarmer.cropTypes.map(c => (
                  <Badge key={c} variant="sky" className="text-xs py-1 px-3">
                    <Wheat className="w-3 h-3 mr-1 inline" />
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
