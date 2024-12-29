import mongoose, { set } from 'mongoose';
import { type } from 'os';
import { stringify } from 'querystring';
import { setConstantValue } from 'typescript';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['MCAT', 'ECAT', 'NTS', 'SAT', 'HAT'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  timeLimit: {
    type: Number,
    required: true
  },
  questions: [questionSchema],
  status: {
    type:String
  },
  attempts:{
    type:Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 
}, {
  timestamps: true
});

export default mongoose.model('Quiz', quizSchema);