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

    // Validate input
    if (!email || !answer) {
      return res.status(400).json({ message: 'Email and security answer are required' });
    }

    // Find user by email 
    const user = await User.findOne({ email }).select('+securityAnswer');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided answer with the stored one
    // const isCorrect = await user.compareSecurityAnswer(answer);
    
    if(user.securityAnswer == answer){
      res.status(200).json({ message: 'Security answer verified' });
    }else {
      return res.status(401).json({ message: 'Incorrect security answer' });
    }

    // Respond with success if everything is correct
    // res.status(200).json({ message: 'Security answer verified' });
  } catch (error) {
    console.error('Error verifying security answer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { email, securityAnswer, newPassword } = req.body;

    // Find user and verify security answer
    let user = await User.findOne({ email }).select('+securityAnswer');
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return early if no user found
    }

    // Check if the provided security answer matches
    if (user.securityAnswer == securityAnswer) {
      // Update password if security answer is correct
      user.password = await hashPassword(newPassword); // Hash the new password
      user = await user.save(); // Save the user with the new password
      console.log(user)
      return res.json({ message: 'Password reset successful' }); // Return success message
    } else {
      return res.status(400).json({ message: 'Incorrect security answer' }); // Return early if answer is incorrect
    }

  } catch (error) {
    console.error(error); // Log the error for debugging
    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
};
