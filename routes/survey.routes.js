import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import {
  getSurveys,
  createSurvey,
  updateSurveyStatus
} from '../controllers/survey.controller.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getSurveys);
router.post('/', requireRole(['client']), createSurvey);
router.put('/:id/status', requireRole(['admin']), updateSurveyStatus);

export default router;