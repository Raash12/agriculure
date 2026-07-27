"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getFinancialSummary = exports.mockTransactions = void 0;
exports.mockTransactions = [
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
        category: 'Canal Machinery Maintenance',
        amountUSD: 3200.00,
        referenceNo: 'TXN-2026-902',
        description: 'Repair and diesel fueling for River Shabelle irrigation excavator',
        date: '2026-07-22'
    },
    {
        id: 'tx-003',
        type: 'INCOME',
        category: 'FAO Agricultural Support Grant',
        amountUSD: 45000.00,
        referenceNo: 'TXN-2026-903',
        description: 'Grant disbursement for Baladweyne flood protection & farmer input subsidy',
        date: '2026-07-15'
    },
    {
        id: 'tx-004',
        type: 'EXPENSE',
        category: 'Field Officer Extension Logistics',
        amountUSD: 1850.00,
        referenceNo: 'TXN-2026-904',
        description: 'Extension officers field survey transportation & training materials',
        date: '2026-07-24'
    }
];
const getFinancialSummary = async (req, res) => {
    const totalIncome = exports.mockTransactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amountUSD, 0);
    const totalExpense = exports.mockTransactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amountUSD, 0);
    const netBalance = totalIncome - totalExpense;
    return res.json({
        success: true,
        data: {
            summary: {
                totalIncomeUSD: totalIncome,
                totalExpenseUSD: totalExpense,
                netBalanceUSD: netBalance,
                budgetAllocatedUSD: 100000.00,
                budgetUtilizedPct: Math.round((totalExpense / 100000.00) * 100)
            },
            transactions: exports.mockTransactions
        }
    });
};
exports.getFinancialSummary = getFinancialSummary;
const createTransaction = async (req, res) => {
    const { type, category, amountUSD, description } = req.body;
    const newTx = {
        id: `tx-${Date.now()}`,
        type: type || 'EXPENSE',
        category: category || 'General Operational Expense',
        amountUSD: parseFloat(amountUSD),
        referenceNo: `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        description: description || 'Transaction record',
        date: new Date().toISOString().split('T')[0]
    };
    exports.mockTransactions.unshift(newTx);
    return res.status(201).json({ success: true, message: 'Transaction recorded', data: newTx });
};
exports.createTransaction = createTransaction;
