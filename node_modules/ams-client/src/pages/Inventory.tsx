import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  AlertTriangle, 
  QrCode, 
  Warehouse, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingDown
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { InventoryItem } from '../types';
import { INITIAL_INVENTORY } from '../services/api';
import { useToast } from '../context/ToastContext';

export const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedItemForStock, setSelectedItemForStock] = useState<InventoryItem | null>(null);
  const [stockAmount, setStockAmount] = useState('10');
  const [movementType, setMovementType] = useState<'STOCK_IN' | 'STOCK_OUT'>('STOCK_IN');

  const { showToast } = useToast();

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const lowStockItems = items.filter(i => i.quantity <= i.minStockAlert);

  const handleStockMovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForStock) return;

    const qty = parseInt(stockAmount, 10);
    if (isNaN(qty) || qty <= 0) return;

    setItems(items.map(item => {
      if (item.id === selectedItemForStock.id) {
        const newQty = movementType === 'STOCK_IN' ? item.quantity + qty : Math.max(0, item.quantity - qty);
        return { ...item, quantity: newQty };
      }
      return item;
    }));

    showToast(
      'Stock Updated',
      `${movementType === 'STOCK_IN' ? 'Added' : 'Dispatched'} ${qty} ${selectedItemForStock.unit} for ${selectedItemForStock.name}.`,
      'success'
    );

    setSelectedItemForStock(null);
  };

  return (
    <div className="space-y-6">
      {/* Low Stock Emergency Banner */}
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 text-amber-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider">
                Low Stock Threshold Alert ({lowStockItems.length} items)
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {lowStockItems.map(i => `${i.name} (${i.quantity} ${i.unit})`).join(', ')} require urgent procurement re-order.
              </p>
            </div>
          </div>
          <button
            onClick={() => showToast('Re-order Request Issued', 'Purchase order created for suppliers.', 'info')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 shrink-0"
          >
            Auto Re-Order
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-7 h-7 text-emerald-500" />
            Cooperative Inventory & Seed Stocks
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time stock tracking for Seeds, Fertilizers, Solar Irrigation Pumps, Pesticides, and Tools.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by SKU, barcode, item name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'SEEDS', 'FERTILIZER', 'EQUIPMENT', 'PESTICIDES'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map(item => {
          const isLow = item.quantity <= item.minStockAlert;
          return (
            <Card key={item.id} className="relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={isLow ? 'amber' : 'emerald'}>
                    {item.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{item.barcode.slice(-5)}</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 mt-1">
                  {item.name}
                </h3>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">SKU: {item.sku}</p>

                <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{item.unit}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full ${isLow ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, (item.quantity / (item.minStockAlert * 3)) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Safety threshold: {item.minStockAlert} {item.unit}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">${item.unitCost} / {item.unit}</span>
                <button
                  onClick={() => setSelectedItemForStock(item)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors"
                >
                  Adjust Stock
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stock Movement Modal */}
      {selectedItemForStock && (
        <Modal
          isOpen={!!selectedItemForStock}
          onClose={() => setSelectedItemForStock(null)}
          title={`Stock Movement: ${selectedItemForStock.name}`}
        >
          <form onSubmit={handleStockMovement} className="space-y-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMovementType('STOCK_IN')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  movementType === 'STOCK_IN'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                }`}
              >
                + STOCK IN (Receive)
              </button>
              <button
                type="button"
                onClick={() => setMovementType('STOCK_OUT')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  movementType === 'STOCK_OUT'
                    ? 'bg-rose-600 text-white border-rose-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                }`}
              >
                - STOCK OUT (Dispatch)
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Quantity ({selectedItemForStock.unit})</label>
              <input
                type="number"
                required
                min="1"
                value={stockAmount}
                onChange={(e) => setStockAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedItemForStock(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Confirm Movement
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
