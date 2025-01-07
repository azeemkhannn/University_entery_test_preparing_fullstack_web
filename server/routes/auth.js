import express from 'express';
import { register, login, logout, getProfile } from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';
import { initiatePasswordReset,verifySecurityAnswer,resetPassword } from '../controllers/forgotPassword.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);

// Password reset routes
router.post('/forgot-password', initiatePasswordReset);
router.post('/verify-security', verifySecurityAnswer); 
router.post('/reset-password', resetPassword);

export default router;