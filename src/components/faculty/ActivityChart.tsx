import React from 'react';
import { BarChart2 } from 'lucide-react';

export default function ActivityChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart2 className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Student Activity</h2>
        </div>
        <select className="text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="h-64 flex items-end justify-between">
        {[65, 45, 78, 52, 63, 43, 57].map((height, index) => (
          <div key={index} className="w-1/8 px-2">
            <div
              className="bg-indigo-600 rounded-t-lg hover:bg-indigo-700 transition-colors"
              style={{ height: `${height}%` }}
            />
            <div className="text-xs text-gray-500 text-center mt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}