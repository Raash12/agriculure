import { Router } from 'express';
import { getCrops, createCrop, updateCropStatus, deleteCrop } from '../controllers/cropController';
import { authenticateToken, requireRoles } from '../middleware/auth';
import { Role } from '../types';

const router = Router();

router.use(authenticateToken);

router.get('/', getCrops);
router.post('/', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR, Role.EXTENSION_OFFICER, Role.FARMER]), createCrop);
router.patch('/:id/status', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR, Role.EXTENSION_OFFICER, Role.FARMER]), updateCropStatus);
router.delete('/:id', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), deleteCrop);

export default router;
