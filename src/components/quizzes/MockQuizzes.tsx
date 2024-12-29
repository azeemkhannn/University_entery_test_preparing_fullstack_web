import React, { useEffect, useState } from 'react';
import { Clock, Users, Award } from 'lucide-react';
import { Await, useNavigate } from 'react-router-dom';

interface MockQuizProps {
  testType: string;
  mockQuizzes: any[];
}

export default function MockQuizzes({ testType,mockQuizzes }: MockQuizProps) {
  const navigate = useNavigate();
  // const [mockQuizzes, setMockQuizzes] = useState<any[]>([]);
  const [Mock, setMock] = useState<string>('Mock');

  // Mock data - replace with API call
  // const mockQuizzes = [
  //   {
  //     id: 1,
  //     title: `${testType.toUpperCase()} Full Mock Test 1`,
  //     duration: 180,
  //     questions: 100,
  //     attempts: 1250,
  //     difficulty: 'Medium'
  //   },
  //   {
  //     id: 2,
  //     title: `${testType.toUpperCase()} Practice Mock 2`,
  //     duration: 180,
  //     questions: 100,
  //     attempts: 980,
  //     difficulty: 'Hard'
  //   }
  // ];



  const handleStartQuiz = (quizId: number) => {
    navigate(`/dashboard/start-quiz?test=${testType}&quizid=${quizId}&type=Mock`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Mock Tests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockQuizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">{quiz.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                quiz.difficulty === 'Hard' 
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {quiz.difficulty}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>{quiz.timeLimit} minutes</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="h-4 w-4 mr-2" />
                <span>{quiz.questions} questions</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                <span>{quiz.attempts} attempts</span>
              </div>
            </div>

            <button
              onClick={() => handleStartQuiz(quiz._id)}
              className="mt-6 w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Mock Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}