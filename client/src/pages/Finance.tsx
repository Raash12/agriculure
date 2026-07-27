import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart as PieIcon, 
  Receipt,
  Wallet
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { FinancialTransaction } from '../types';
import { useToast } from '../context/ToastContext';

export const Finance: React.FC = () => {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([
    {
      id: 'tx-001',
      type: 'INCOME',
      category: 'Cooperative Seed Sales',
      amountUSD: 14500.00,
      referenceNo: 'TXN-2026-901',
      description: 'Bulk drought-resistant sesame seed sales to member farmers',
      date: '2026-07-20'
    },
    {
      id: 'tx-002',
      type: 'EXPENSE',
      category: 'Canal Machinery Repair',
      amountUSD: 3200.00,
      referenceNo: 'TXN-2026-902',
      description: 'Repair and diesel fueling for River Shabelle irrigation excavator',
      date: '2026-07-22'
    },
    {
      id: 'tx-003',
      type: 'INCOME',
      category: 'FAO Support Grant',
      amountUSD: 45000.00,
      referenceNo: 'TXN-2026-903',
      description: 'Grant disbursement for Baladweyne flood protection & input subsidy',
      date: '2026-07-15'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
  const [category, setCategory] = useState('Seed Sales');
  const [amountUSD, setAmountUSD] = useState('1000');
  const [description, setDescription] = useState('');

  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amountUSD, 0);
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amountUSD, 0);
  const netBalance = totalIncome - totalExpense;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amountUSD);
    if (isNaN(amt) || amt <= 0) return;

    const newTx: FinancialTransaction = {
      id: `tx-${Date.now()}`,
      type,
      category,
      amountUSD: amt,
      referenceNo: `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      description: description || 'Recorded Transaction',
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([newTx, ...transactions]);
    setIsModalOpen(false);
    showToast('Transaction Recorded', `${type} of $${amt.toFixed(2)} added.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-7 h-7 text-emerald-500" />
            Financial Dashboard & Ledger
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Cooperative income, operating expenses, grants, resource costs, and budget tracking.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Record Transaction</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="bg-gradient-to-tr from-emerald-500/10 to-teal-500/5">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Total Revenue / Income</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            ${totalIncome.toLocaleString()} USD
          </p>
        </Card>

        <Card className="bg-gradient-to-tr from-rose-500/10 to-orange-500/5">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">Total Expenses</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            ${totalExpense.toLocaleString()} USD
          </p>
        </Card>

        <Card className="bg-gradient-to-tr from-sky-500/10 to-indigo-500/5">
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">Net Reserve Balance</span>
          <p className="text-2xl font-black text-emerald-500 mt-2">
            ${netBalance.toLocaleString()} USD
          </p>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Ref #</th>
                <th className="px-6 py-3.5">Type & Category</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5">Amount (USD)</th>
                <th className="px-6 py-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-mono font-bold text-slate-500">
                    {t.referenceNo}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={t.type === 'INCOME' ? 'emerald' : 'rose'}>
                        {t.type}
                      </Badge>
                      <span className="font-semibold text-slate-900 dark:text-white">{t.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {t.description}
                  </td>
                  <td className={`px-6 py-4 font-extrabold text-sm ${t.type === 'INCOME' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {t.type === 'INCOME' ? '+' : '-'}${t.amountUSD.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono">
                    {t.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Record Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Cooperative Financial Transaction">
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setType('INCOME')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold ${type === 'INCOME' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              + INCOME
            </button>
            <button
              type="button"
              onClick={() => setType('EXPENSE')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold ${type === 'EXPENSE' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              - EXPENSE
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Category</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Amount (USD)</label>
            <input
              type="number"
              required
              value={amountUSD}
              onChange={(e) => setAmountUSD(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-700 bg-slate-800"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-400">Cancel</button>
            <button type="submit" className="px-5 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-xl">Save Transaction</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
