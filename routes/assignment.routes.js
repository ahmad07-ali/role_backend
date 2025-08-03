import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import {
  getAssignments,
  createAssignment,
  updateAssignmentStatus
} from '../controllers/assignment.controller.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAssignments);
router.post('/', requireRole(['admin']), createAssignment);
router.put('/:id/status', updateAssignmentStatus);

export default router;