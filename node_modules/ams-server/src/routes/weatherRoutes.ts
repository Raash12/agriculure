import { Router } from 'express';
import { getWeatherAlerts } from '../controllers/weatherController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);
router.get('/', getWeatherAlerts);

export default router;
