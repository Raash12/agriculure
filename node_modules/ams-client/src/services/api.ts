import axios, { InternalAxiosRequestConfig } from 'axios';
import { Farmer, Crop, InventoryItem, ResourceRequest, ResourceDistribution, MarketPrice, FinancialTransaction, AuditLog } from '../types';

const API_BASE_URL = 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('ams_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Seed data for standalone client fallback preview
export const INITIAL_FARMERS: Farmer[] = [
  {
    id: 'f-101',
    fullName: 'Abdi Hassan Nur',
    nationalId: 'SO-8829104',
    phone: '+252 61 289 1100',
    village: 'Bundaweyn',
    district: 'Baladweyne',
    farmSizeHectares: 12.5,
    latitude: 4.736,
    longitude: 45.204,
    status: 'ACTIVE',
    cropTypes: ['Sesame', 'Maize'],
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    createdAt: '2026-01-15'
  },
  {
    id: 'f-102',
    fullName: 'Fadumo Omar Ali',
    nationalId: 'SO-9921045',
    phone: '+252 61 772 3456',
    village: 'Kooshin',
    district: 'Baladweyne',
    farmSizeHectares: 8.0,
    latitude: 4.741,
    longitude: 45.212,
    status: 'ACTIVE',
    cropTypes: ['Sorghum', 'Watermelon'],
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
    createdAt: '2026-02-10'
  },
  {
    id: 'f-103',
    fullName: 'Mohamud Farah Ibrahim',
    nationalId: 'SO-7740192',
    phone: '+252 61 991 0022',
    village: 'Howlwadaag',
    district: 'Baladweyne',
    farmSizeHectares: 25.0,
    latitude: 4.729,
    longitude: 45.198,
    status: 'ACTIVE',
    cropTypes: ['Sesame', 'Tomatoes', 'Onions'],
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    createdAt: '2026-03-01'
  },
  {
    id: 'f-104',
    fullName: 'Asha Mohamed Ahmed',
    nationalId: 'SO-6619028',
    phone: '+252 61 443 8901',
    village: 'Kawaali',
    district: 'Baladweyne',
    farmSizeHectares: 5.5,
    latitude: 4.750,
    longitude: 45.220,
    status: 'INACTIVE',
    cropTypes: ['Maize'],
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
    createdAt: '2026-04-12'
  }
];

export const INITIAL_CROPS: Crop[] = [
  {
    id: 'crop-101',
    farmerId: 'f-101',
    farmerName: 'Abdi Hassan Nur',
    cropName: 'Sesame (Sisim)',
    category: 'Oilseed',
    season: 'GU_SPRING',
    areaPlantedHa: 8.5,
    expectedYieldTon: 12.0,
    actualYieldTon: 11.8,
    status: 'HARVESTED',
    plantingDate: '2026-04-10',
    harvestDate: '2026-07-20',
  },
  {
    id: 'crop-102',
    farmerId: 'f-101',
    farmerName: 'Abdi Hassan Nur',
    cropName: 'Maize (Sorbey)',
    category: 'Cereal',
    season: 'DER_AUTUMN',
    areaPlantedHa: 4.0,
    expectedYieldTon: 8.0,
    actualYieldTon: null,
    status: 'GROWING',
    plantingDate: '2026-06-01',
    harvestDate: '2026-09-15',
  },
  {
    id: 'crop-103',
    farmerId: 'f-102',
    farmerName: 'Fadumo Omar Ali',
    cropName: 'Watermelon',
    category: 'Fruit',
    season: 'GU_SPRING',
    areaPlantedHa: 3.5,
    expectedYieldTon: 15.0,
    actualYieldTon: 16.2,
    status: 'HARVESTED',
    plantingDate: '2026-03-20',
    harvestDate: '2026-06-28',
  },
  {
    id: 'crop-104',
    farmerId: 'f-103',
    farmerName: 'Mohamud Farah Ibrahim',
    cropName: 'Tomatoes',
    category: 'Vegetable',
    season: 'XAGAAG_SUMMER',
    areaPlantedHa: 10.0,
    expectedYieldTon: 35.0,
    actualYieldTon: null,
    status: 'HARVEST_READY',
    plantingDate: '2026-05-05',
    harvestDate: '2026-08-01',
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001',
    name: 'Somali Drought-Resistant Sesame Seeds',
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
    minStockAlert: 200,
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
    name: 'Organic Locust Control Pesticide',
    category: 'PESTICIDES',
    sku: 'PEST-LCT-010',
    barcode: '8901234567893',
    quantity: 400,
    unit: 'liters',
    minStockAlert: 100,
    unitCost: 18.5,
    warehouse: 'Baladweyne Main Depot A',
    supplier: 'CropGuard International'
  }
];

export const INITIAL_REQUESTS: ResourceRequest[] = [
  {
    id: 'req-201',
    farmerId: 'f-101',
    farmerName: 'Abdi Hassan Nur',
    village: 'Bundaweyn',
    resourceType: 'SEEDS',
    resourceName: 'Somali Drought-Resistant Sesame Seeds',
    requestedQty: 50,
    unit: 'kg',
    urgency: 'HIGH',
    reason: 'Preparing field for Gu season planting before expected rains.',
    status: 'PENDING',
    createdAt: '2026-07-27T10:00:00Z'
  },
  {
    id: 'req-202',
    farmerId: 'f-102',
    farmerName: 'Fadumo Omar Ali',
    village: 'Kooshin',
    resourceType: 'EQUIPMENT',
    resourceName: 'Solar Irrigation Motor Pump 5HP',
    requestedQty: 1,
    unit: 'units',
    urgency: 'EMERGENCY',
    reason: 'River irrigation canal water level dropped, pump needed immediately.',
    status: 'APPROVED',
    officerComment: 'Urgent irrigation need verified by Extension Officer Jama.',
    approvedBy: 'Dr. Abdirahman Farah',
    createdAt: '2026-07-26T14:30:00Z'
  }
];
