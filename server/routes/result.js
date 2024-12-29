import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  submitQuiz,
  getResults,
  getResultById
} from '../controllers/result.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(submitQuiz)
  .get(getResults);

router.get('/:id', getResultById);

export default router;