import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { getDashboardStats } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/stats', getDashboardStats);

export default router;