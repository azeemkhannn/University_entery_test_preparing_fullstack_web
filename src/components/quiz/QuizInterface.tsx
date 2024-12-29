import React, { useState, useEffect } from 'react';
import QuizTimer from './QuizTimer';
import QuizProgress from './QuizProgress';
import QuizQuestion from './QuizQuestion';
import QuizNavigation from './QuizNavigation';
import axios from 'axios';
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';

interface QuizInterfaceProps {
  testType: string;
  quizType: string;
  subject?: string;
}

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function QuizInterface({ testType, quizType, subject }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [questions, setQuestions] = useState([]); // Dynamic questions array
  // const [isloading, setIsLoading] = useState(true);
  const [quizId, setQuizId] = useState(''); // Set the quiz ID here
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching questions for:', testType, quizType, subject);
    handleGetQuizzes();
  }, []);

  const handleGetQuizzes = async () => {
    try {
      const body = {
        testType,
        quizType,
        ...(subject && { subject }), // Include subject only if it exists
      };

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/quiz/getquizzes`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );

      if (response.data && response.data.questions) {
        
        const questionsWithoutExplanation = response.data.questions.map(
          ({ explanation, ...rest }: any) => rest
        );
       
        setQuestions(questionsWithoutExplanation);
        setTimeRemaining(response.data.timeLimit*60);
        setQuizId(response.data._id);
      }else if(response.data && Array.isArray(response.data.quizzes)){ 
        alert("MOCK Quiz data fetched successfully in development");
        
      }else {
        alert(response.data.message || 'Quiz not found');
      }
    } catch (error: any) {
      console.error('Error fetching quiz data:', error);

      
    }
  };
  
  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    try {
      // const quizId = 'yourQuizId'; // Replace with the actual quiz ID
      
      const timeTaken = 3600 - timeRemaining; // Assuming timeRemaining is in seconds
      
      const body = {
        quizId,
        answers: Object.keys(answers).map((questionId) => {
          return {
            questionId: questionId,
            selectedAnswer: answers[questionId],
          };
        }),
        timeTaken,
      };
  
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/result/', // Assuming this is the endpoint for submitting quiz
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );
  
      if (response.data) {
        // navigate('/dashboard/results', { state: { result: response.data.feedback,feedback: response.data.feedback } });
        // Handle the response here (e.g., display feedback, results)
        navigate('/dashboard/results');
      }
    } catch (error: any) {
      console.error('Error submitting quiz:', error);
      alert('An error occurred while submitting the quiz');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {quizType === 'full' ? 'Full Mock Test' : `${subject} Quiz`}
              </h2>
              <QuizTimer timeRemaining={timeRemaining} onTimeEnd={handleSubmit} />
            </div>
            <QuizProgress current={currentQuestion + 1} total={questions.length} />
          </div>

          <div className="p-6">
            <QuizQuestion
              question={questions[currentQuestion]} // Ensure this is valid
              selectedAnswer={answers[questions[currentQuestion]?._id]}
              onAnswerSelect={(optionIndex) =>
                handleAnswerSelect(questions[currentQuestion]?._id, optionIndex)
              }
            />
          </div>

          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            answers={answers}
            onNavigate={setCurrentQuestion}
            onSubmit={handleSubmit}
          />
        </div>
     
    </div>
  );
}
