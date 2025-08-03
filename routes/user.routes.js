import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

import {
  getAllUsers,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/user.controller.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', requireRole(['admin']), getAllUsers);
router.get('/employees', requireRole(['admin']), getEmployees);
router.post('/employee', requireRole(['admin']), createEmployee);
router.put('/employee/:id', requireRole(['admin']), updateEmployee);
router.delete('/employee/:id', requireRole(['admin']), deleteEmployee);

export default router;