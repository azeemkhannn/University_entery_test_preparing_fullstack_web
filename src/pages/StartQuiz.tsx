// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import DashboardLayout from '../components/dashboard/DashboardLayout';
// import QuizSelector from '../components/quiz/QuizSelector';
// import QuizInterface from '../components/quiz/QuizInterface';
// import { set } from 'mongoose';
// import { useQuizTimer } from '../hooks/useQuizTimer';
// import QuizPagination from '../components/quiz/QuizPagination';
// import QuizTimer from '../components/quiz/QuizTimer';

// export default function StartQuiz() {
//   // const [searchParams] = useSearchParams();
//   // let testType = searchParams.get('test') || '';
//   const [testType, setTestType] = useState<string>('');
//   const [selectedQuizType, setSelectedQuizType] = useState<string>('');
//   const [selectedSubject, setSelectedSubject] = useState<string>('');
//   const [isQuizStarted, setIsQuizStarted] = useState(false);

//   const handleStartQuiz = () => {
//     setIsQuizStarted(true);
//   };
//   useEffect(() => {
//     const selectedtest = localStorage.getItem('selectedTest');
   
//      if(selectedtest){
//        setTestType(selectedtest);
//      }
    
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {!isQuizStarted ? (
//           <QuizSelector
//             testType={testType}
//             selectedQuizType={selectedQuizType}
//             selectedSubject={selectedSubject}
//             onQuizTypeChange={setSelectedQuizType}
//             onSubjectChange={setSelectedSubject}
//             onStartQuiz={handleStartQuiz}
//           />
//         ) : (
//           <QuizInterface
//             testType={testType}
//             quizType={selectedQuizType}
//             subject={selectedSubject}
//           />
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }







import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
// import QuizSelector from '../components/quiz/QuizSelector';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizTimer from '../components/quiz/QuizTimer';
import QuizPagination from '../components/quiz/QuizPagination';
import { useQuizTimer } from '../hooks/useQuizTimer';
// import { set } from 'mongoose';
import axios from 'axios';
import { set } from 'mongoose';





export default function StartQuiz() {

 
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const testType = searchParams.get('test') || '';
  const quizId = searchParams.get('quizid') || '';
  const selectedQuizType = searchParams.get('type') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState< any>({});
  // const [testType, setTestType] = useState<string>('');
  const [mockQuestions, setmockQuestions] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  // const [quizId, setQuizId] = useState(''); // Set the quiz ID here
  // const [refersh, setRefresh] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [timeTaken, setTimeTaken] = useState(0);
  
  const questionsPerPage = 5;
  const totalPages = Math.ceil(mockQuestions.length / questionsPerPage);

  
  
  // const { minutes, seconds } =  useQuizTimer(timeRemaining, handleTimeEnd); // 60 minutes
 
 
  const getCurrentQuestions = useCallback(() => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    return mockQuestions.slice(startIndex, startIndex + questionsPerPage);
  }, [currentPage,mockQuestions]);

  function handleTimeEnd() {
    handleSubmitQuiz();
  }

  function handleAnswerSelect(questionId: any, optionIndex: any) {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    // setTestType(localStorage.getItem('selectedTest') || '');
    
      handleGetQuizzes();
      
    
  }, []);

  
//===================================================================================================
  const handleGetQuizzes =async () => {
    try {
      setIsLoading(true);
      // setTestType(localStorage.getItem('selectedTest') || '');
      const body = {
        testType,
        quizId
      };

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/quiz/getquizzes-for-attempts`,
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

        setTimeRemaining(response.data.timeLimit*60);
        setmockQuestions(questionsWithoutExplanation);
        // setTotalTime(response.data.timeLimit*60);
        
       
       
       
        
        // setQuizId(response.data._id);
        

      }else {
        alert( 'Quiz not found');
      }
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching quiz data:', error);
      

      setIsLoading(false);
    }
  }



// ===================================================================================================

const handleSubmitQuiz = async () => {
  try {
    // const quizId = 'yourQuizId'; // Replace with the actual quiz ID
    
    // const timeTaken = Math.ceil((totaltime - timeRemaining) / 60)
    // const time = timeRemaining-timeTaken
    // setTimeTaken(time)
    // alert(timeTaken)
    const body = {
      quizId,
      answers: Object.keys(answers).map((questionId) => {
        return {
          questionId: questionId,
          selectedAnswer: answers[questionId], // Corrected the way selectedAnswer is accessed
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
      
      navigate('/dashboard/quiz-analysis', { state: { result: response.data.result, feedback: response.data.feedback, quizDetails: response.data.quizDetails } }); // Handle the response properly
    }
  } catch (error: any) {
    console.error('Error submitting quiz:', error);
    alert('An error occurred while submitting the quiz');
  }
};







  
  
if(isloading){
  return <div className=''>Loading...</div>
}else{
  const currentQuestions = getCurrentQuestions();
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedQuizType === 'Mock' ? 'Full Mock Test' : `${selectedQuizType} Quiz`}
              </h2>
              <QuizTimer timeRemaining={timeRemaining}  handleTimeEnd={ handleTimeEnd} taketime={setTimeTaken} />
            </div>
          </div>

          {/* Questions */}
          <div className="p-6 space-y-8">
            {currentQuestions.map((question, index) => (
              
              <QuizQuestion
                i = {index}
                key={question._id}
                question={question}
                selectedAnswer={answers[question._id]}
                onAnswerSelect={(optionIndex) => handleAnswerSelect(question._id, optionIndex)}
                
              />
            ))}
          </div>

          {/* Pagination */}
          <QuizPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {/* Submit Button */}
          {currentPage === totalPages && (
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleSubmitQuiz}
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
}