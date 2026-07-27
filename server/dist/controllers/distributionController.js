"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDistribution = exports.getDistributions = exports.mockDistributions = void 0;
exports.mockDistributions = [
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
];
const getDistributions = async (req, res) => {
    return res.json({
        success: true,
        data: exports.mockDistributions
    });
};
exports.getDistributions = getDistributions;
const createDistribution = async (req, res) => {
    const { farmerId, farmerName, nationalId, itemId, itemName, quantity, unit, digitalSignature } = req.body;
    const newDist = {
        id: `dist-${Date.now()}`,
        farmerId,
        farmerName,
        nationalId,
        itemId,
        itemName,
        quantity: parseInt(quantity, 10),
        unit,
        receiptNumber: `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        distributionDate: new Date().toISOString().split('T')[0],
        status: 'DELIVERED',
        digitalSignature: digitalSignature || 'SIG_CAPTURED_DIGITAL'
    };
    exports.mockDistributions.unshift(newDist);
    return res.status(201).json({
        success: true,
        message: 'Resource distribution recorded and digital receipt created',
        data: newDist
    });
};
exports.createDistribution = createDistribution;
