import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import farmerRoutes from './routes/farmerRoutes';
import cropRoutes from './routes/cropRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import requestRoutes from './routes/requestRoutes';
import distributionRoutes from './routes/distributionRoutes';
import weatherRoutes from './routes/weatherRoutes';
import marketRoutes from './routes/marketRoutes';
import financeRoutes from './routes/financeRoutes';
import reportRoutes from './routes/reportRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/farmers', farmerRoutes);
app.use('/api/v1/crops', cropRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/distributions', distributionRoutes);
app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/market-prices', marketRoutes);
app.use('/api/v1/finance', financeRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/users', userRoutes);

// Central Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌱 Baladweyne AMS API Server running on port ${PORT}`);
  console.log(`📡 Healthcheck: http://localhost:${PORT}/api/v1/health`);
  console.log(`=======================================================`);
});
