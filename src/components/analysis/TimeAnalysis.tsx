import React from 'react';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface TimeAnalysisProps {
  timeManagement: {
    averageTimePerQuestion: number;
    efficiency: string;
    suggestion: string;
  };
}

export default function TimeAnalysis({ timeManagement }: TimeAnalysisProps) {
  const isEfficient = timeManagement.efficiency === 'Good';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Clock className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Time Analysis</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-700">Average Time per Question</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(timeManagement.averageTimePerQuestion)} seconds
            </p>
          </div>
          {isEfficient ? (
            <TrendingDown className="h-8 w-8 text-green-600" />
          ) : (
            <TrendingUp className="h-8 w-8 text-red-600" />
          )}
        </div>

        <div className={`p-4 rounded-lg ${
          isEfficient ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <p className="font-medium">{timeManagement.efficiency}</p>
          <p className="text-sm mt-1">{timeManagement.suggestion}</p>
        </div>
      </div>
    </div>
  );
}