import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PerformanceSummary() {
  // Mock data (replace with actual data from your MongoDB)
  const results = [
    {
      id: 1,
      quizName: 'Biology Mock Test',
      score: 85,
      date: '2024-03-20',
      improvement: true,
    },
    {
      id: 2,
      quizName: 'Chemistry Practice',
      score: 78,
      date: '2024-03-18',
      improvement: false,
    },
    {
      id: 3,
      quizName: 'Physics Quiz',
      score: 92,
      date: '2024-03-15',
      improvement: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Performance</h2>
        <span className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">View all results</span>
      </div>
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="flex items-center p-4 border rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
              {result.improvement ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-gray-900">{result.quizName}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span>{new Date(result.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={`text-lg font-semibold ${
              result.improvement ? 'text-green-600' : 'text-red-600'
            }`}>
              {result.score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}