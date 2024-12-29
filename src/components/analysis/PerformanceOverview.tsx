import React from 'react';
import { Trophy, AlertTriangle, CheckCircle } from 'lucide-react';

interface PerformanceOverviewProps {
  score: number;
  performance: {
    excellent: boolean;
    good: boolean;
    needsImprovement: boolean;
  };
}

export default function PerformanceOverview({ score, performance }: PerformanceOverviewProps) {
  const getPerformanceDetails = () => {
    if (performance.excellent) {
      return {
        icon: Trophy,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        message: 'Excellent performance! Keep up the great work!'
      };
    }
    if (performance.good) {
      return {
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        message: 'Good job! You\'re making solid progress.'
      };
    }
    return {
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      message: 'There\'s room for improvement. Keep practicing!'
    };
  };

  const details = getPerformanceDetails();
  const Icon = details.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
        <div className={`px-4 py-2 rounded-full ${details.bgColor} ${details.color}`}>
          Score: {score}%
        </div>
      </div>

      <div className={`flex items-center p-4 ${details.bgColor} rounded-lg`}>
        <Icon className={`h-6 w-6 ${details.color} mr-3`} />
        <p className={`${details.color} font-medium`}>{details.message}</p>
      </div>
    </div>
  );
}