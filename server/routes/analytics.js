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

router.get('/performance', getPerformanceAnalytics);
router.get('/subjects', getSubjectWiseAnalysis);
router.get('/suggestions', getImprovementSuggestions);
router.get('/progress', getStudyProgress);

export default router;