import React from 'react';
import { Calendar } from 'lucide-react';

interface UpcomingQuizzesProps {
  testType: string;
}

export default function UpcomingQuizzes({ testType }: UpcomingQuizzesProps) {
  // Mock data (replace with actual data from your MongoDB)
  const quizzes = [
    {
      id: 1,
      name: 'Biology Practice Test',
      date: '2024-03-25',
      duration: '60 mins',
    },
    {
      id: 2,
      name: 'Chemistry Mock Exam',
      date: '2024-03-27',
      duration: '45 mins',
    },
    {
      id: 3,
      name: 'Physics Quiz',
      date: '2024-03-29',
      duration: '30 mins',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming {testType} Quizzes</h2>
        <span className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">View all</span>
      </div>
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
            <Calendar className="h-10 w-10 text-indigo-600 mr-4" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{quiz.name}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span>{new Date(quiz.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{quiz.duration}</span>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}