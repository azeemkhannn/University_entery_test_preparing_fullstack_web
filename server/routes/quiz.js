import express from 'express';
import { protect, faculty, student } from '../middleware/auth.js';
import Quiz from '../models/Quiz.js';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  uploadQuestions,
  attemptsQuizzes
} from '../controllers/quiz.js';
import { uploadMiddleware } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(faculty, createQuiz)


router.route('/:id')
  .get(getQuizById)
  .put(faculty, updateQuiz)
  .delete(faculty, deleteQuiz);

router.post('/:id/upload-questions',
  faculty,
  uploadMiddleware,
  uploadQuestions
);

router.route('/getquizzes-for-attempts')
  .post(student, attemptsQuizzes);

router.route('/quizpage')
  .post(student,getQuizzes);








export default router;