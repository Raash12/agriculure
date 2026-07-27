import { Router } from 'express';
import { getFinancialSummary, createTransaction } from '../controllers/financeController';
import { authenticateToken, requireRoles } from '../middleware/auth';
import { Role } from '../types';

const router = Router();

router.use(authenticateToken);
router.get('/', getFinancialSummary);
router.post('/transactions', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), createTransaction);

export default router;
