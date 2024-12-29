import React from 'react';
import { BookOpen, Video, FileText, Brain } from 'lucide-react';

interface PracticeResource {
  type: string;
  title: string;
  duration?: string;
  questions?: number;
  count?: number;
}

interface SubjectImprovement {
  subject: string;
  incorrectCount: number;
  suggestions: Array<{
    questionId: string;
    explanation: string;
  }>;
  recommendedTopics: string[];
  practiceResources: PracticeResource[];
}

interface ImprovementTipsProps {
  improvements: SubjectImprovement[];
}

export default function ImprovementTips({ improvements }: ImprovementTipsProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'quiz':
        return FileText;
      case 'problems':
        return Brain;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Areas for Improvement
      </h2>

      <div className="space-y-8">
        {improvements.map((subject) => (
          <div key={subject.subject} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {subject.subject}
              </h3>
              <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full">
                {subject.incorrectCount} incorrect
              </span>
            </div>

            {/* Recommended Topics */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Focus Areas:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {subject.recommendedTopics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>

            {/* Practice Resources */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Recommended Resources:</h4>
              {subject.practiceResources.map((resource, index) => {
                const Icon = getResourceIcon(resource.type);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Icon className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {resource.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {resource.duration || 
                           (resource.questions && `${resource.questions} questions`) ||
                           (resource.count && `${resource.count} problems`)}
                        </p>
                      </div>
                    </div>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700">
                      Start
                    </button>
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