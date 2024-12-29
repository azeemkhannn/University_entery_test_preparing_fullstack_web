import express from 'express';
import cors from 'cors';
import config from './config/env.js';
import connectDB from './config/database.js';
import logger from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import resultRoutes from './routes/result.js';
import studentDashboardRoutes from './routes/dashboard.js';
import facultyDashboardRoutes from './routes/faculty/dashboard.js';
import userRoutes from './routes/user.js';
import Quiz from './models/Quiz.js';
import User from './models/User.js';
import analyticsRoutes from './routes/analytics.js';
import Result from './models/Result.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/dashboard', studentDashboardRoutes);
app.use('/api/faculty/dashboard', facultyDashboardRoutes);
app.use('/api/user', userRoutes);
app.use('/api/analytics', analyticsRoutes);




//faculty dashboard
app.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find() // Fetch all quizzes from the database
      .select('title category subject timeLimit status attempts questions difficulty') // Select only the specified fields
      .lean(); // Convert the results to plain JavaScript objects, which are easier to manipulate

    // Modify the quizzes data to include the length of the questions array
    const quizzesWithQuestionCount = quizzes.map(quiz => ({
      ...quiz,
      questions: quiz.questions.length, // Add the length of the questions array
    }));

    res.status(200).json(quizzesWithQuestionCount); // Return quizzes with the question count as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
});




//faculty dashboard
app.get('/index/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Extract quiz details
    const quizDetails = {
      title: quiz.title,
      category: quiz.category,
      subject: quiz.subject,
      timeLimit: quiz.timeLimit,
      status: quiz.status,
      attempts: quiz.attempts,
    };

    // Extract questions separately
    const questions = quiz.questions;

    res.status(200).json({ quizDetails, questions });
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
});




//faculty dashboard
app.get('/index/user-quiz', async (req, res) => {
  try {
    const facultyCount = await User.countDocuments({ userType: "faculty" });
    const studentCount = await User.countDocuments({ userType: "student" });
    const quizCount = await Quiz.countDocuments();

    res.status(200).json({ facultyCount, studentCount, quizCount });
  } catch (error) {
    console.error("Error fetching user quiz data:", error); // Log the error for debugging
    res.status(500).json({ message: "Failed to fetch data", error: error.message }); // Send error with proper status code
  }
});

//===================================================================================


//student dashboard


app.get('/index/user-testtype/:id', async (req, res) => {
  try {
    console.log("Fetching user's selected test type...");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ selectedTest: user.selectedTest });
  } catch (error) {
    console.error('Error fetching user test type:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 

app.post('/index/user-selectedTest/:id', async (req, res) => {
  try {
    console.log("Call user-selectedTest");
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const { selectedTest } = req.body;
    user.selectedTest = selectedTest;
    await user.save(); // Save the updated user to the database

    console.log("User updated successfully", user);
    res.status(200).json({ selectedTest: user.selectedTest });
  } catch (error) {
    console.error('Error updating selectedTest:', error);
    res.status(500).json({ message: 'Failed to update selectedTest' });
  }
});

app.post("/index/user-reset/:id", async (req, res) => {
  try {
    console.log("Call user-reset");
    const user = await User.findById(req.params.id); 
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    user.selectedTest = null; 
    await user.save();
    const result = await Result.deleteMany({ user: req.params.id });
    console.log("User updated successfully", user);

    res.status(200).json({ selectedTest: user.selectedTest });
    
  } catch (error) {
    console.error("Error updating selectedTest:", error);
    res.status(500).json({ message: "Failed to update selectedTest" });
  }
});



// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB();

const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});