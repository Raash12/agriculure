import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  FileText, 
  CheckCircle2, 
  Printer, 
  Download, 
  PenTool,
  QrCode
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ResourceDistribution } from '../types';
import { INITIAL_FARMERS, INITIAL_INVENTORY } from '../services/api';
import { useToast } from '../context/ToastContext';

export const Distributions: React.FC = () => {
  const [distributions, setDistributions] = useState<ResourceDistribution[]>([
    {
      id: 'dist-501',
      farmerId: 'f-101',
      farmerName: 'Abdi Hassan Nur',
      nationalId: 'SO-8829104',
      itemId: 'inv-001',
      itemName: 'Somali Drought-Resistant Sesame Seeds',
      quantity: 25,
      unit: 'kg',
      receiptNumber: 'RCP-2026-0091',
      distributionDate: '2026-07-25',
      status: 'DELIVERED',
      digitalSignature: 'SIG_OK_ABDI_8829'
    },
    {
      id: 'dist-502',
      farmerId: 'f-102',
      farmerName: 'Fadumo Omar Ali',
      nationalId: 'SO-9921045',
      itemId: 'inv-003',
      itemName: 'Solar Irrigation Motor Pump 5HP',
      quantity: 1,
      unit: 'units',
      receiptNumber: 'RCP-2026-0092',
      distributionDate: '2026-07-26',
      status: 'DELIVERED',
      digitalSignature: 'SIG_OK_FADUMO_9921'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ResourceDistribution | null>(null);
  const { showToast } = useToast();

  const [farmerId, setFarmerId] = useState('f-101');
  const [itemId, setItemId] = useState('inv-001');
  const [quantity, setQuantity] = useState('20');
  const [signatureText, setSignatureText] = useState('Digital Signature Token #44901');

  const handleCreateDistribution = (e: React.FormEvent) => {
    e.preventDefault();
    const farmer = INITIAL_FARMERS.find(f => f.id === farmerId);
    const item = INITIAL_INVENTORY.find(i => i.id === itemId);

    if (!farmer || !item) return;

    const newDist: ResourceDistribution = {
      id: `dist-${Date.now()}`,
      farmerId: farmer.id,
      farmerName: farmer.fullName,
      nationalId: farmer.nationalId,
      itemId: item.id,
      itemName: item.name,
      quantity: parseInt(quantity, 10),
      unit: item.unit,
      receiptNumber: `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      distributionDate: new Date().toISOString().split('T')[0],
      status: 'DELIVERED',
      digitalSignature: signatureText
    };

    setDistributions([newDist, ...distributions]);
    setIsModalOpen(false);
    showToast('Distribution Recorded', `Receipt ${newDist.receiptNumber} generated for ${farmer.fullName}.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="w-7 h-7 text-emerald-500" />
            Resource Distribution & Digital Receipts
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate digital signatures and verification receipts for seed, equipment, and fertilizer dispatches.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Distribution Receipt</span>
        </button>
      </div>

      {/* Distribution Log Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Receipt #</th>
                <th className="px-6 py-3.5">Farmer & National ID</th>
                <th className="px-6 py-3.5">Item Dispatched</th>
                <th className="px-6 py-3.5">Quantity</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Digital Signature</th>
                <th className="px-6 py-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {distributions.map(dist => (
                <tr key={dist.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-mono font-bold text-emerald-500">
                    {dist.receiptNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">{dist.farmerName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{dist.nationalId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                    {dist.itemName}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                    {dist.quantity} {dist.unit}
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono">
                    {dist.distributionDate}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="emerald" className="font-mono text-[10px]">
                      VERIFIED ✓
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(dist)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                      title="Print Digital Receipt"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Distribution Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue Resource Distribution Receipt">
        <form onSubmit={handleCreateDistribution} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1">Select Beneficiary Farmer</label>
            <select
              value={farmerId}
              onChange={(e) => setFarmerId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              {INITIAL_FARMERS.map(f => (
                <option key={f.id} value={f.id}>
                  {f.fullName} ({f.nationalId}) - {f.village}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Select Resource Item</label>
            <select
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              {INITIAL_INVENTORY.map(i => (
                <option key={i.id} value={i.id}>
                  {i.name} (Stock: {i.quantity} {i.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <PenTool className="w-4 h-4 text-emerald-500" />
              <span>Digital Farmer Signature Token</span>
            </div>
            <input
              type="text"
              readOnly
              value={signatureText}
              className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
            >
              Confirm & Issue Receipt
            </button>
          </div>
        </form>
      </Modal>

      {/* Digital Receipt View Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title={`Digital Receipt: ${selectedReceipt.receiptNumber}`}
        >
          <div className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="font-black text-base text-emerald-700">BALADWEYNE AGRICULTURAL COOPERATIVE</h2>
                <p className="text-[11px] text-slate-500">Hiran Region, Somalia • Official Resource Dispatch Slip</p>
              </div>
              <Badge variant="emerald" className="font-mono text-xs">{selectedReceipt.receiptNumber}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Beneficiary Farmer</span>
                <p className="font-bold">{selectedReceipt.farmerName}</p>
                <p className="text-[11px] text-slate-500 font-mono">National ID: {selectedReceipt.nationalId}</p>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Distribution Date</span>
                <p className="font-bold">{selectedReceipt.distributionDate}</p>
                <p className="text-[11px] text-emerald-600 font-bold">STATUS: {selectedReceipt.status}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Item Description</span>
              <p className="font-extrabold text-sm text-slate-800">{selectedReceipt.itemName}</p>
              <p className="font-bold text-emerald-600 text-lg mt-1">{selectedReceipt.quantity} {selectedReceipt.unit}</p>
            </div>

            <div className="pt-4 border-t flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Digital Signature Token</span>
                <p className="font-mono text-xs text-slate-600">{selectedReceipt.digitalSignature}</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white flex items-center gap-1"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
