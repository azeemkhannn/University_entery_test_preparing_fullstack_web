import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface Result {
  results: {
  _id: string;
  quiz: {
    _id: string;
    title: string;
    category: string;
    subject: string;
  };
  score: number;
  timeTaken: number;
  createdAt: string;
} [];
}


export default function PerformanceSummary( {results} : Result) {
  const navigate = useNavigate();
  // Mock data (replace with actual data from your MongoDB)
  // const results = [
  //   {
  //     "_id": "677288d5797a4e28bb33bc1d",
  //     "quiz": {
  //         "_id": "67702455769eb87239f4564e",
  //         "title": "Biology common medical",
  //         "category": "MCAT",
  //         "subject": "Biology"
  //     },
  //     "score": 40,
  //     "timeTaken": 126,
  //     "createdAt": "2024-12-30T11:49:41.072Z"
  // },
  // {
  //     "_id": "67728821797a4e28bb33bb8d",
  //     "quiz": {
  //         "_id": "67702455769eb87239f4564e",
  //         "title": "Biology common medical",
  //         "category": "MCAT",
  //         "subject": "Biology"
  //     },
  //     "score": 25,
  //     "timeTaken": 33,
  //     "createdAt": "2024-12-30T11:46:41.028Z"
  // }
  //   // {
  //   //   id: 1,
  //   //   quizName: 'Biology Mock Test',
  //   //   score: 85,
  //   //   date: '2024-03-20',
  //   //   improvement: true,
  //   // },
  //   // {
  //   //   id: 2,
  //   //   quizName: 'Chemistry Practice',
  //   //   score: 78,
  //   //   date: '2024-03-18',
  //   //   improvement: false,
  //   // },
  //   // {
  //   //   id: 3,
  //   //   quizName: 'Physics Quiz',
  //   //   score: 92,
  //   //   date: '2024-03-15',
  //   //   improvement: true,
  //   // },
  // ];
  

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Performance</h2>
        
        <button onClick={() => navigate('/dashboard/results')} className="flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-md">
        <span className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">View all results</span>
        </button>
      </div>
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result._id} className="flex items-center p-4 border rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
              {result.score>=70 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-gray-900">{result.quiz.title}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span>{new Date(result.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={`text-lg font-semibold ${
              result.score >=70 ? 'text-green-600' : 'text-red-600'
            }`}>
              {result.score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}