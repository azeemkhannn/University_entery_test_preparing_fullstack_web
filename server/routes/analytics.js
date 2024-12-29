import express from 'express';
import { protect, student } from '../middleware/auth.js';
import {
  getPerformanceAnalytics,
  getSubjectWiseAnalysis,
  getImprovementSuggestions,
  getStudyProgress
} from '../controllers/analytics.js';

const router = express.Router();

router.use(protect);
router.use(student);

router.post('/performance', getPerformanceAnalytics);
router.post('/subjects', getSubjectWiseAnalysis);
router.post('/suggestions', getImprovementSuggestions);
router.post('/progress', getStudyProgress);

export default router;