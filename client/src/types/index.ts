export type Role = 
  | 'SUPER_ADMIN' 
  | 'ADMINISTRATOR' 
  | 'AGRICULTURAL_OFFICER'
  | 'EXTENSION_OFFICER' 
  | 'INVENTORY_OFFICER' 
  | 'FARMER'
  | 'VIEWER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: Role;
  status: UserStatus;
  isLocked: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  avatarUrl: string;
  lastLogin: string;
  createdAt: string;
  permissions?: string[];
}

export interface LoginHistoryItem {
  id: string;
  ipAddress: string;
  device: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED';
}

export interface Farmer {
  id: string;
  fullName: string;
  nationalId: string;
  phone: string;
  village: string;
  district: string;
  farmSizeHectares: number;
  latitude: number;
  longitude: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  cropTypes: string[];
  photoUrl?: string;
  createdAt: string;
}

export interface Crop {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  category: string;
  season: string;
  areaPlantedHa: number;
  expectedYieldTon: number;
  actualYieldTon?: number | null;
  status: 'PLANTED' | 'GROWING' | 'FLOWERING' | 'HARVEST_READY' | 'HARVESTED' | 'DAMAGED';
  plantingDate: string;
  harvestDate?: string | null;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'SEEDS' | 'FERTILIZER' | 'EQUIPMENT' | 'PESTICIDES' | 'TOOLS';
  sku: string;
  barcode: string;
  quantity: number;
  unit: string;
  minStockAlert: number;
  unitCost: number;
  warehouse: string;
  supplier: string;
}

export interface ResourceRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  village: string;
  resourceType: string;
  resourceName: string;
  requestedQty: number;
  unit: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  reason: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'FULFILLED';
  officerComment?: string;
  approvedBy?: string;
  createdAt: string;
}

export interface ResourceDistribution {
  id: string;
  farmerId: string;
  farmerName: string;
  nationalId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  receiptNumber: string;
  distributionDate: string;
  status: string;
  digitalSignature?: string;
}

export interface MarketPrice {
  id: string;
  cropName: string;
  marketName: string;
  pricePerKgUSD: number;
  prevPriceUSD?: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  demand: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendedMarket: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amountUSD: number;
  referenceNo: string;
  description: string;
  date: string;
}

export interface AuditLog {
  id: string;
  action: string;
  module: string;
  user: string;
  ipAddress: string;
  details: string;
  timestamp: string;
}
