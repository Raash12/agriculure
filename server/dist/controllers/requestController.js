"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveRejectRequest = exports.createRequest = exports.getRequests = exports.mockRequests = void 0;
exports.mockRequests = [
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
        officerComment: null,
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
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
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
        id: 'req-203',
        farmerId: 'f-103',
        farmerName: 'Mohamud Farah Ibrahim',
        village: 'Howlwadaag',
        resourceType: 'FERTILIZER',
        resourceName: 'NPK 17-17-17 Fertilizer',
        requestedQty: 10,
        unit: 'bags (50kg)',
        urgency: 'MEDIUM',
        reason: 'Tomato field requires side-dressing nitrogen boost.',
        status: 'REJECTED',
        officerComment: 'Farmer quota for season already utilized.',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
    }
];
const getRequests = async (req, res) => {
    const { status, urgency } = req.query;
    let filtered = [...exports.mockRequests];
    if (status) {
        filtered = filtered.filter(r => r.status === String(status));
    }
    if (urgency) {
        filtered = filtered.filter(r => r.urgency === String(urgency));
    }
    return res.json({
        success: true,
        data: filtered,
        summary: {
            totalRequests: filtered.length,
            pendingCount: exports.mockRequests.filter(r => r.status === 'PENDING').length,
            approvedCount: exports.mockRequests.filter(r => r.status === 'APPROVED').length,
            rejectedCount: exports.mockRequests.filter(r => r.status === 'REJECTED').length
        }
    });
};
exports.getRequests = getRequests;
const createRequest = async (req, res) => {
    const { farmerId, farmerName, village, resourceType, resourceName, requestedQty, unit, urgency, reason } = req.body;
    const newReq = {
        id: `req-${Date.now()}`,
        farmerId: farmerId || 'f-101',
        farmerName: farmerName || 'Abdi Hassan Nur',
        village: village || 'Bundaweyn',
        resourceType: resourceType || 'SEEDS',
        resourceName: resourceName || 'Requested Resource',
        requestedQty: parseInt(requestedQty, 10) || 1,
        unit: unit || 'units',
        urgency: urgency || 'MEDIUM',
        reason: reason || 'Seasonal farm input requirement',
        status: 'PENDING',
        officerComment: null,
        createdAt: new Date().toISOString()
    };
    exports.mockRequests.unshift(newReq);
    return res.status(201).json({ success: true, message: 'Resource request submitted', data: newReq });
};
exports.createRequest = createRequest;
const approveRejectRequest = async (req, res) => {
    const { id } = req.params;
    const { status, officerComment, approvedBy } = req.body; // status: 'APPROVED' | 'REJECTED'
    const request = exports.mockRequests.find(r => r.id === id);
    if (!request) {
        return res.status(404).json({ success: false, error: 'Request not found' });
    }
    request.status = status;
    if (officerComment)
        request.officerComment = officerComment;
    if (status === 'APPROVED') {
        request.approvedBy = approvedBy || 'Admin Officer';
    }
    return res.json({ success: true, message: `Request status changed to ${status}`, data: request });
};
exports.approveRejectRequest = approveRejectRequest;
