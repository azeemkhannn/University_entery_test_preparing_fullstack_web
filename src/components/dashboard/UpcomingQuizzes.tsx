import React from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpcomingQuizzesProps {
  quizzes: {
    _id: string;
    title: string;
    subject: string;
    timeLimit: number;
    createdAt: string;
  }[];
  testType: string;
}

export default function UpcomingQuizzes({ quizzes, testType }: UpcomingQuizzesProps) {
  const navigate = useNavigate();

  const handleStartQuiz = (quizId: string, subject: string) => {
    navigate(`/dashboard/start-quiz?test=${testType}&quizid=${quizId}&type=${subject}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming {testType} Quizzes</h2>
        <button
          onClick={() => navigate('/dashboard/quizzes')}
          className="flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-md"
        >
          <span className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">View all</span>
        </button>
      </div>

      {quizzes.length > 0 ? (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <Calendar className="h-10 w-10 text-indigo-600 mr-4" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{quiz.timeLimit} mins</span>
                  <span className="ml-3">{quiz.subject}</span>
                </div>
              </div>
              <button
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
                onClick={() => handleStartQuiz(quiz._id, quiz.subject)}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No upcoming quizzes found.</p>
        </div>
      )}
    </div>
  );
}
