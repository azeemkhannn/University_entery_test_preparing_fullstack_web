import express from 'express';
import { protect, faculty } from '../../middleware/auth.js';
import { getFacultyDashboard } from '../../controllers/faculty/dashboard.js';

const router = express.Router();

router.use(protect);
router.use(faculty);

router.get('/', getFacultyDashboard);

export default router;