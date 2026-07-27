import { Router } from 'express';
import { getMarketPrices } from '../controllers/marketController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);
router.get('/', getMarketPrices);

export default router;
