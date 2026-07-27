"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFarmer = exports.updateFarmer = exports.createFarmer = exports.getFarmerById = exports.getFarmers = exports.mockFarmers = void 0;
// Seed mock farmers for API test drive
exports.mockFarmers = [
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
        createdAt: new Date().toISOString()
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
        createdAt: new Date().toISOString()
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
        createdAt: new Date().toISOString()
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
        createdAt: new Date().toISOString()
    }
];
const getFarmers = async (req, res) => {
    const { search, village, status, page = '1', limit = '10' } = req.query;
    let filtered = [...exports.mockFarmers];
    if (search) {
        const q = String(search).toLowerCase();
        filtered = filtered.filter(f => f.fullName.toLowerCase().includes(q) ||
            f.nationalId.toLowerCase().includes(q) ||
            f.phone.includes(q) ||
            f.village.toLowerCase().includes(q));
    }
    if (village) {
        filtered = filtered.filter(f => f.village.toLowerCase() === String(village).toLowerCase());
    }
    if (status) {
        filtered = filtered.filter(f => f.status === String(status).toUpperCase());
    }
    const p = parseInt(String(page), 10);
    const l = parseInt(String(limit), 10);
    const total = filtered.length;
    const startIndex = (p - 1) * l;
    const paginated = filtered.slice(startIndex, startIndex + l);
    return res.json({
        success: true,
        data: paginated,
        pagination: {
            total,
            page: p,
            limit: l,
            totalPages: Math.ceil(total / l)
        }
    });
};
exports.getFarmers = getFarmers;
const getFarmerById = async (req, res) => {
    const farmer = exports.mockFarmers.find(f => f.id === req.params.id);
    if (!farmer) {
        return res.status(404).json({ success: false, error: 'Farmer not found' });
    }
    return res.json({ success: true, data: farmer });
};
exports.getFarmerById = getFarmerById;
const createFarmer = async (req, res) => {
    const { fullName, nationalId, phone, village, district, farmSizeHectares, latitude, longitude, cropTypes } = req.body;
    const existing = exports.mockFarmers.find(f => f.nationalId === nationalId);
    if (existing) {
        return res.status(400).json({ success: false, error: 'National ID already exists' });
    }
    const newFarmer = {
        id: `f-${Date.now()}`,
        fullName,
        nationalId,
        phone,
        village: village || 'Bundaweyn',
        district: district || 'Baladweyne',
        farmSizeHectares: parseFloat(farmSizeHectares) || 1.0,
        latitude: latitude ? parseFloat(latitude) : 4.735,
        longitude: longitude ? parseFloat(longitude) : 45.205,
        status: 'ACTIVE',
        cropTypes: Array.isArray(cropTypes) ? cropTypes : ['Sesame'],
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`,
        createdAt: new Date().toISOString()
    };
    exports.mockFarmers.unshift(newFarmer);
    return res.status(201).json({ success: true, message: 'Farmer registered successfully', data: newFarmer });
};
exports.createFarmer = createFarmer;
const updateFarmer = async (req, res) => {
    const index = exports.mockFarmers.findIndex(f => f.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Farmer not found' });
    }
    exports.mockFarmers[index] = {
        ...exports.mockFarmers[index],
        ...req.body,
    };
    return res.json({ success: true, message: 'Farmer updated successfully', data: exports.mockFarmers[index] });
};
exports.updateFarmer = updateFarmer;
const deleteFarmer = async (req, res) => {
    const index = exports.mockFarmers.findIndex(f => f.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Farmer not found' });
    }
    exports.mockFarmers.splice(index, 1);
    return res.json({ success: true, message: 'Farmer record deleted (Soft deleted)' });
};
exports.deleteFarmer = deleteFarmer;
