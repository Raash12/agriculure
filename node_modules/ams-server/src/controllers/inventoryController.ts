import { Request, Response } from 'express';

export let mockInventory = [
  {
    id: 'inv-001',
    name: 'Somali Drought-Resistant Sesame Seeds (White)',
    category: 'SEEDS',
    sku: 'SEED-SES-001',
    barcode: '8901234567890',
    quantity: 1450,
    unit: 'kg',
    minStockAlert: 300,
    unitCost: 4.5,
    warehouse: 'Baladweyne Main Depot A',
    supplier: 'Horn Seed Corp'
  },
  {
    id: 'inv-002',
    name: 'NPK 17-17-17 Fertilizer',
    category: 'FERTILIZER',
    sku: 'FERT-NPK-50K',
    barcode: '8901234567891',
    quantity: 180,
    unit: 'bags (50kg)',
    minStockAlert: 200, // Trigger low stock alert!
    unitCost: 32.0,
    warehouse: 'Baladweyne Main Depot A',
    supplier: 'AgriGrow East Africa'
  },
  {
    id: 'inv-003',
    name: 'Solar Irrigation Motor Pump 5HP',
    category: 'EQUIPMENT',
    sku: 'EQP-PMP-SLR5',
    barcode: '8901234567892',
    quantity: 24,
    unit: 'units',
    minStockAlert: 5,
    unitCost: 650.0,
    warehouse: 'Shabelle River Bank Depot B',
    supplier: 'SolarTech Somalia'
  },
  {
    id: 'inv-004',
    name: 'Organic Locust Control Pesticide (Deltamethrin)',
    category: 'PESTICIDES',
    sku: 'PEST-LCT-010',
    barcode: '8901234567893',
    quantity: 400,
    unit: 'liters',
    minStockAlert: 100,
    unitCost: 18.5,
    warehouse: 'Baladweyne Main Depot A',
    supplier: 'CropGuard International'
  },
  {
    id: 'inv-005',
    name: 'Ergonomic Soil Tilling Hoe',
    category: 'TOOLS',
    sku: 'TOOL-HOE-200',
    barcode: '8901234567894',
    quantity: 85,
    unit: 'units',
    minStockAlert: 100, // Trigger alert
    unitCost: 8.0,
    warehouse: 'Bundaweyn Sub-station',
    supplier: 'Local Artisan Cooperative'
  }
];

export const getInventory = async (req: Request, res: Response) => {
  const { search, category, lowStockOnly } = req.query;

  let filtered = [...mockInventory];

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.sku.toLowerCase().includes(q) ||
      i.barcode?.includes(q)
    );
  }

  if (category) {
    filtered = filtered.filter(i => i.category === String(category));
  }

  if (lowStockOnly === 'true') {
    filtered = filtered.filter(i => i.quantity <= i.minStockAlert);
  }

  return res.json({
    success: true,
    data: filtered,
    summary: {
      totalItems: filtered.length,
      lowStockCount: mockInventory.filter(i => i.quantity <= i.minStockAlert).length,
      totalInventoryValueUSD: mockInventory.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0)
    }
  });
};

export const createInventoryItem = async (req: Request, res: Response) => {
  const { name, category, sku, barcode, quantity, unit, minStockAlert, unitCost, warehouse, supplier } = req.body;

  const newItem = {
    id: `inv-${Date.now()}`,
    name,
    category: category || 'SEEDS',
    sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
    barcode: barcode || Math.floor(1000000000000 + Math.random() * 9000000000000).toString(),
    quantity: parseInt(quantity, 10) || 0,
    unit: unit || 'units',
    minStockAlert: parseInt(minStockAlert, 10) || 10,
    unitCost: parseFloat(unitCost) || 0.0,
    warehouse: warehouse || 'Baladweyne Main Depot A',
    supplier: supplier || 'Global Agri Supply'
  };

  mockInventory.unshift(newItem);
  return res.status(201).json({ success: true, message: 'Item added to inventory', data: newItem });
};

export const stockMovement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, amount, reason } = req.body; // type: 'STOCK_IN' | 'STOCK_OUT'

  const item = mockInventory.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Inventory item not found' });
  }

  const qty = parseInt(amount, 10);
  if (type === 'STOCK_OUT') {
    if (item.quantity < qty) {
      return res.status(400).json({ success: false, error: 'Insufficient stock available' });
    }
    item.quantity -= qty;
  } else {
    item.quantity += qty;
  }

  return res.json({
    success: true,
    message: `Stock updated successfully (${type})`,
    data: item
  });
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
  const index = mockInventory.findIndex(i => i.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Inventory item not found' });
  }

  mockInventory.splice(index, 1);
  return res.json({ success: true, message: 'Inventory item deleted' });
};
