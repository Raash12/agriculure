import { Router } from 'express';
import { generateReport } from '../controllers/reportController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);
router.get('/generate', generateReport);

export default router;
