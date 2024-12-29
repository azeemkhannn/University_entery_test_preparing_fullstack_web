import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

interface ProgressData {
  date: string;
  quizzesTaken: number;
  averageScore: number;
}

interface StudyProgressProps {
  progress: ProgressData[];
}

export default function StudyProgress({ progress }: StudyProgressProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Study Progress</h2>
        </div>
      </div>

      <div className="space-y-4">
        {progress.map((entry) => (
          <div
            key={entry.date}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{formatDate(entry.date)}</p>
                <p className="text-sm text-gray-500">
                  {entry.quizzesTaken} {entry.quizzesTaken === 1 ? 'quiz' : 'quizzes'} taken
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                {Math.round(entry.averageScore)}%
              </div>
              <div className="text-sm text-gray-500">Average Score</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}