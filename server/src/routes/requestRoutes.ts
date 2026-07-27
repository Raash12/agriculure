import { Router } from 'express';
import { getRequests, createRequest, approveRejectRequest } from '../controllers/requestController';
import { authenticateToken, requireRoles } from '../middleware/auth';
import { Role } from '../types';

const router = Router();

router.use(authenticateToken);

router.get('/', getRequests);
router.post('/', createRequest);
router.patch('/:id/approval', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR, Role.EXTENSION_OFFICER, Role.INVENTORY_OFFICER]), approveRejectRequest);

export default router;
