"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const farmerRoutes_1 = __importDefault(require("./routes/farmerRoutes"));
const cropRoutes_1 = __importDefault(require("./routes/cropRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
const distributionRoutes_1 = __importDefault(require("./routes/distributionRoutes"));
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
const marketRoutes_1 = __importDefault(require("./routes/marketRoutes"));
const financeRoutes_1 = __importDefault(require("./routes/financeRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Rate Limiter
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // limit each IP to 300 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use(limiter);
// Body Parser
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Health Check
app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'HEALTHY',
        service: 'Baladweyne Agricultural Management System (AMS) Backend API',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});
// API Routes
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/farmers', farmerRoutes_1.default);
app.use('/api/v1/crops', cropRoutes_1.default);
app.use('/api/v1/inventory', inventoryRoutes_1.default);
app.use('/api/v1/requests', requestRoutes_1.default);
app.use('/api/v1/distributions', distributionRoutes_1.default);
app.use('/api/v1/weather', weatherRoutes_1.default);
app.use('/api/v1/market-prices', marketRoutes_1.default);
app.use('/api/v1/finance', financeRoutes_1.default);
app.use('/api/v1/reports', reportRoutes_1.default);
app.use('/api/v1/users', userRoutes_1.default);
// Central Error Handling
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🌱 Baladweyne AMS API Server running on port ${PORT}`);
    console.log(`📡 Healthcheck: http://localhost:${PORT}/api/v1/health`);
    console.log(`=======================================================`);
});
