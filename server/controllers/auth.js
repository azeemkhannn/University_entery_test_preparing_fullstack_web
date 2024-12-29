import User from '../models/User.js';
import TokenDenylist from '../models/TokenDenylist.js';
import { generateToken, hashPassword, validatePassword, validateEmail } from '../utils/auth.js';

export const register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      phone, 
      userType, 
      educationLevel, 
      selectedTest 
    } = req.body;
    

    // Validate input
    if (!name || !email || !password || !phone ) {
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    // Validate password strength
    // const passwordValidation = validatePassword(password);
    // if (!passwordValidation.isValid) {
    //   return res.status(400).json({ 
    //     message: 'Password is not strong enough',
    //     errors: passwordValidation.errors
    //   });
    // }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        message: 'User already exists with this email' 
      });
    }

    // Validate user type specific requirements
    // if (userType === 'student' && !selectedTest) {
    //   return res.status(400).json({ 
    //     message: 'Please select a test type' 
    //   });
    // }

    // Create user
    
    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
      phone,
      userType,
      educationLevel: userType === 'student' ? educationLevel : undefined,
      selectedTest: userType === 'student' ? selectedTest : undefined
    });

    // Generate token and send response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      phone: user.phone,
      educationLevel: user.educationLevel,
      selectedTest: user.selectedTest,
      token: generateToken(user)
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error creating user account' 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide email and password' 
      });
    }

    // Find user and validate password
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Generate token and send response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      phone: user.phone,
      educationLevel: user.educationLevel,
      selectedTest: user.selectedTest,
      token: generateToken(user)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error during login' 
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Add the token to the denylist
    await TokenDenylist.create({ token: req.token });
    
    res.json({ 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      message: 'Error during logout' 
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Error fetching user profile' 
    });
  }
};