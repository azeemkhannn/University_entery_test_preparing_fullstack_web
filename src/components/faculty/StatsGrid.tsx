import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  id: number;
  name: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  positive: boolean;
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <stat.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <span className={`text-sm font-medium ${
              stat.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}