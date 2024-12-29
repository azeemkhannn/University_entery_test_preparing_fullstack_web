import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';

interface Resource {
  type: string;
  title: string;
  url?: string;
  count?: number;
}

interface Recommendation {
  topic: string;
  count: number;
  suggestion: string;
  resources: Resource[];
}

interface RecommendationPanelProps {
  recommendations: Recommendation[];
}

export default function RecommendationPanel({ recommendations }: RecommendationPanelProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'practice':
        return FileText;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Recommendations
      </h2>

      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">{rec.topic}</h3>
              <p className="text-sm text-gray-500 mt-1">{rec.suggestion}</p>
            </div>

            <div className="space-y-3">
              {rec.resources.map((resource, rIndex) => {
                const Icon = getResourceIcon(resource.type);
                return (
                  <div
                    key={rIndex}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-indigo-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {resource.title}
                      </p>
                      {resource.count && (
                        <p className="text-xs text-gray-500">
                          {resource.count} items
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}