import React from 'react';
import { BarChart2, Target, BookOpen } from 'lucide-react';

interface SubjectAnalytics {
  _id: string;
  subject: string;
  totalAttempts: number;
  averageScore: number;
  accuracy: number;
}

interface SubjectBreakdownProps {
  analytics: SubjectAnalytics[];
}

export default function SubjectBreakdown({ analytics }: SubjectBreakdownProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Subject Breakdown</h2>
        </div>
        <div className="text-sm text-gray-500">
          {analytics.length} subjects analyzed
        </div>
      </div>

      <div className="space-y-6">
        {analytics.map((subject) => (
          <div key={subject._id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium text-gray-900">
                  {subject.subject}
                </h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Target className="w-4 h-4 mr-1" />
                  <span>Accuracy: {Math.round(subject.accuracy)}%</span>
                  <span className="mx-2">•</span>
                  <BarChart2 className="w-4 h-4 mr-1" />
                  <span>Attempts: {subject.totalAttempts}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {Math.round(subject.averageScore)}%
                </div>
                <div className="text-sm text-gray-500">Average Score</div>
              </div>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getScoreColor(subject.averageScore)}`}
                style={{ width: `${subject.averageScore}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}