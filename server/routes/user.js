import express from 'express';
import { protect } from '../middleware/auth.js';
import { getProfile, updateProfile, updatePassword } from '../controllers/user.js';

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);

export default router;