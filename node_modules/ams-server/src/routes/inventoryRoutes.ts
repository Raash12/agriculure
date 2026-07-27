import { Router } from 'express';
import { getInventory, createInventoryItem, stockMovement, deleteInventoryItem } from '../controllers/inventoryController';
import { authenticateToken, requireRoles } from '../middleware/auth';
import { Role } from '../types';

const router = Router();

router.use(authenticateToken);

router.get('/', getInventory);
router.post('/', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR, Role.INVENTORY_OFFICER]), createInventoryItem);
router.post('/:id/stock-movement', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR, Role.INVENTORY_OFFICER]), stockMovement);
router.delete('/:id', requireRoles([Role.SUPER_ADMIN, Role.ADMINISTRATOR]), deleteInventoryItem);

export default router;
