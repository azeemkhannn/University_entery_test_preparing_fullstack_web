import React from 'react';
import { Trophy, Clock, Target, BarChart2 } from 'lucide-react';

interface ScoreSummaryProps {
  analytics: {
    totalQuizzes: number;
    totalTime: number;
    highestScore: number;
    lowestScore: number;
    averageScore: number;
  };
}

export default function ScoreSummary({ analytics }: ScoreSummaryProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const stats = [
    {
      label: 'Average Score',
      value: `${Math.round(analytics.averageScore)}%`,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'Total Time',
      value: formatTime(analytics.totalTime),
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Highest Score',
      value: `${analytics.highestScore}%`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Total Quizzes',
      value: analytics.totalQuizzes,
      icon: BarChart2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}