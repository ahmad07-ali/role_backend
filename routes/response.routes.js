import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { getResponses, createResponse } from '../controllers/response.controller.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getResponses);
router.post('/', requireRole(['employee']), createResponse);

export default router;