import express from 'express';
import { protect, student } from '../middleware/auth.js';
import { getDashboardData } from '../controllers/dashboard.js';

const router = express.Router();

router.use(protect);
router.use(student);

router.get('/', getDashboardData);

export default router;