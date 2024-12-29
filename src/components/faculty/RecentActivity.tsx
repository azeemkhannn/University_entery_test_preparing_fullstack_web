import React from 'react';
import { Activity } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      student: 'John Doe',
      action: 'completed',
      quiz: 'MCAT Biology Mock Test',
      time: '2 hours ago',
      score: 85
    },
    {
      id: 2,
      student: 'Jane Smith',
      action: 'started',
      quiz: 'Physics Quiz #4',
      time: '3 hours ago'
    },
    {
      id: 3,
      student: 'Mike Johnson',
      action: 'completed',
      quiz: 'Chemistry Practice Test',
      time: '5 hours ago',
      score: 92
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Activity className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.student}
              </p>
              <p className="text-sm text-gray-500">
                {activity.action} {activity.quiz}
                {activity.score && ` (${activity.score}%)`}
              </p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full text-center text-sm text-indigo-600 hover:text-indigo-700">
        View all activity
      </button>
    </div>
  );
}