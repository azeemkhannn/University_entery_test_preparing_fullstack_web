import Quiz from '../models/Quiz.js';
import { parseCSV, validateQuestions } from '../utils/csvParser.js';

export const createQuiz = async (req, res) => {
  try {
    // Check if the necessary fields are provided in the request body
    if (!req.body.quiz || !req.body.quiz.title || !req.body.quiz.category || !req.body.quiz.subject) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Create the quiz
    const quiz = await Quiz.create({
      ...req.body.quiz,
      createdBy: req.user._id,
    });

    // Send a success response with the created quiz
    res.status(201).json(quiz);
  } catch (error) {
    console.log(error);

    // Handling different types of errors
    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., required fields, data format issues)
      res.status(400).json({ message: 'Invalid data format.' });
    } else if (error.code === 11000) {
      // Handle duplicate key errors (e.g., duplicate quiz title or other unique fields)
      res.status(409).json({ message: 'Quiz already exists.' });
    } else {
      // Generic error message for all other cases
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};


export const getQuizzes = async (req, res) => {
  try {
    const category = req.body.testType;
   if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    
    
    var quizzes;
    
      quizzes = await Quiz.find({ category: category })
        .select('title category subject timeLimit status attempts questions difficulty') // Select only the specified fields
        .lean(); // Convert the results to plain JavaScript objects, which are easier to manipulate
        
   
    // Modify the quizzes data to include the length of the questions array
    const quizzesWithQuestionCount = quizzes.map(quiz => ({
      ...quiz,
      questions: quiz.questions.length, // Add the length of the questions array
    }));

    console.log(quizzesWithQuestionCount);
    
    res.status(200).json(quizzesWithQuestionCount); // Return quizzes with the question count as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'name');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    

    await quiz.deleteOne();
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadQuestions = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Parse CSV file
    
    const questions = await parseCSV(req.formData.file.buffer);
    
    // Validate questions
    const validationErrors = validateQuestions(questions);
    
    if (validationErrors.length > 0) {
      
      return res.status(400).json({
        message: 'Invalid questions format',
        errors: validationErrors
      });
      
    }

    // Add questions to quiz
    quiz.questions.push(...questions);
    await quiz.save();

    res.json({
      message: `Successfully added ${questions.length} questions`,
      quiz
    });
  } catch (error) {
    if (error.message.includes('CSV')) {
      return res.status(400).json({ message: 'Invalid CSV format' });
    }
    res.status(500).json({ message: error.message });
  }
};


export const attemptsQuizzes = async (req, res) => {
  try {
        const { testType,quizId } = req.body; // Retrieve data from the body
  
        // Check for required fields in the body
        if (!testType || !quizId) {
          return res.status(400).json({ error: 'testType and quizType are required' });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
          return res.status(404).json({ message: 'Quiz not found' });
        }
        
        res.status(200).json(quiz);
        
        
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}