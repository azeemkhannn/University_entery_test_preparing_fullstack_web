import User from '../models/User.js';
// import { validatePassword } from '../../utils/validation.js';
import { hashPassword } from '../utils/auth.js';
import { AuthError } from '../utils/errors.js'; 

export const initiatePasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).select('+securityQuestion +securityAnswer');
    if (!user) {
      throw new AuthError('No account found with this email');
    }

    // Return security question
    res.json({
      message: 'Security question retrieved',
      securityQuestion: user.securityQuestion
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const verifySecurityAnswer = async (req, res) => {
  try {
    const { email, answer } = req.body;

    const user = await User.findOne({ email }).select('+securityAnswer');
    if (!user) {
      throw new AuthError('User not found');
    }

    const isCorrect = await user.compareSecurityAnswer(answer);
    if (!isCorrect) {
      throw new AuthError('Incorrect security answer');
    }

    res.json({ message: 'Security answer verified' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, securityAnswer, newPassword } = req.body;

    // Validate password
    // const passwordValidation = validatePassword(newPassword);
    // if (!passwordValidation.isValid) {
    //   throw new AuthError('Invalid password', 400);
    // }

    // Find user and verify security answer
    const user = await User.findOne({ email }).select('+securityAnswer');
    if (!user) {
      throw new AuthError('User not found');
    }

    const isCorrect = await user.compareSecurityAnswer(securityAnswer);
    if (!isCorrect) {
      throw new AuthError('Incorrect security answer');
    }

    // Update password
    user.password = await hashPassword(newPassword);
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};