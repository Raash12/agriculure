import { Router } from 'express';
import { 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  toggleUserStatus, 
  toggleUserLock, 
  resetUserPassword, 
  getAuditLogs 
} from '../controllers/userController';
import { authenticateToken, requireRoles } from '../middleware/auth';
import { Role } from '../types';

const router = Router();

router.use(authenticateToken);

router.get('/', getUsers);
router.post('/', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), createUser);
router.put('/:id', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), updateUser);
router.delete('/:id', requireRoles([Role.SUPER_ADMIN]), deleteUser);
router.patch('/:id/status', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), toggleUserStatus);
router.patch('/:id/lock', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), toggleUserLock);
router.post('/:id/reset-password', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), resetUserPassword);
router.get('/audit-logs', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), getAuditLogs);

export default router;
