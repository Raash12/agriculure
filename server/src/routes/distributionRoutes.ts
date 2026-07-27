import { Router } from 'express';
import { getDistributions, createDistribution } from '../controllers/distributionController';
import { authenticateToken, requireRoles } from '../middleware/auth';
import { Role } from '../types';

const router = Router();

router.use(authenticateToken);

router.get('/', getDistributions);
router.post('/', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR, Role.INVENTORY_OFFICER, Role.EXTENSION_OFFICER]), createDistribution);

export default router;
