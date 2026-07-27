import { Router } from 'express';
import { getFarmers, getFarmerById, createFarmer, updateFarmer, deleteFarmer } from '../controllers/farmerController';
import { authenticateToken, requireRoles } from '../middleware/auth';
import { Role } from '../types';

const router = Router();

router.use(authenticateToken);

router.get('/', getFarmers);
router.get('/:id', getFarmerById);
router.post('/', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR, Role.EXTENSION_OFFICER]), createFarmer);
router.put('/:id', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR, Role.EXTENSION_OFFICER]), updateFarmer);
router.delete('/:id', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), deleteFarmer);

export default router;
