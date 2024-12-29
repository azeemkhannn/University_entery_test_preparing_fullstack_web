import React from 'react';
import { BookOpen, Brain, Beaker, Activity } from 'lucide-react';

export default function StudyRecommendations() {
  // Mock data (replace with actual recommendations based on user performance)
  const recommendations = [
    {
      id: 1,
      title: 'Biology: Cell Structure',
      description: 'Review cell organelles and their functions',
      icon: Brain,
      difficulty: 'Medium',
    },
    {
      id: 2,
      title: 'Chemistry: Organic Compounds',
      description: 'Practice naming organic compounds',
      icon: Beaker,
      difficulty: 'Hard',
    },
    {
      id: 3,
      title: 'Physics: Kinematics',
      description: 'Work on velocity and acceleration problems',
      icon: Activity,
      difficulty: 'Easy',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recommended Study Areas</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-500">
          Refresh recommendations
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <item.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <span className={`ml-2 text-sm px-2 py-1 rounded-full ${
                item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.difficulty}
              </span>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{item.description}</p>
            <button className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors">
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}