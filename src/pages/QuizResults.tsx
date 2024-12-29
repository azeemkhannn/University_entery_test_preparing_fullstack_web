import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RotateCcw, Home } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ScoreSummary from '../components/results/ScoreSummary';
import SubjectBreakdown from '../components/results/SubjectBreakdown';
import StudyProgress from '../components/results/StudyProgress';
import ImprovementTips from '../components/results/ImprovementTips';

export default function QuizResults() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock data - replace with actual API data
  const analytics = {
    totalQuizzes: 1,
    totalTime: 2400,
    highestScore: 70,
    lowestScore: 70,
    averageScore: 70
  };

  const subjectAnalytics = [
    {
      _id: "Biology",
      totalAttempts: 1,
      subject: "Biology",
      averageScore: 70,
      accuracy: 70
    },
    {
      _id: "Chemistry",
      totalAttempts: 1,
      subject: "Chemistry",
      averageScore: 62.5,
      accuracy: 62.5
    }
  ];

  const progressData = [
    {
      quizzesTaken: 2,
      date: "2024-12-27",
      averageScore: 66.25
    }
  ];

  const handleRetake = () => {
    navigate('/dashboard/start-quiz');
  };



  const improvementData = [
    {
        "subject": "Chemistry",
        "incorrectCount": 3,
        "suggestions": [
            {
                "questionId": "6763126b670eedc465543085",
                "explanation": "Mars is known as the Red Planet."
            },
            {
                "questionId": "6763128b670eedc4655430a3",
                "explanation": "Mars is known as the Red Planet."
            },
            {
                "questionId": "6763128b670eedc4655430a4",
                "explanation": "The capital of France is Paris."
            }
        ],
        "recommendedTopics": [
            "Study organic reaction mechanisms",
            "Review periodic table trends",
            "Practice balancing equations"
        ],
        "practiceResources": [
            {
                "type": "video",
                "title": "Organic Chemistry Basics",
                "duration": "30 mins"
            },
            {
                "type": "quiz",
                "title": "Periodic Table Quiz",
                "questions": 25
            },
            {
                "type": "problems",
                "title": "Balancing Equations Set",
                "count": 10
            }
        ]
    },
    {
        "subject": "Biology",
        "incorrectCount": 6,
        "suggestions": [
            {
                "questionId": "6768429fc0d266123f556e90",
                "explanation": "Mars is known as the Red Planet."
            },
            {
                "questionId": "6768429fc0d266123f556e91",
                "explanation": "The capital of France is Paris."
            },
            {
                "questionId": "6768429fc0d266123f556e93",
                "explanation": "The capital of France is Paris."
            },
            {
                "questionId": "6768429fc0d266123f556e94",
                "explanation": "Mars is known as the Red Planet."
            },
            {
                "questionId": "6768429fc0d266123f556e95",
                "explanation": "The capital of France is Paris."
            }
        ],
        "recommendedTopics": [
            "Review cell structure and function",
            "Study molecular biology concepts",
            "Focus on human anatomy"
        ],
        "practiceResources": [
            {
                "type": "video",
                "title": "Cell Biology Overview",
                "duration": "40 mins"
            },
            {
                "type": "quiz",
                "title": "Human Systems Quiz",
                "questions": 30
            },
            {
                "type": "problems",
                "title": "Genetics Problem Set",
                "count": 12
            }
        ]
    }
];





  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score Summary Card */}
          <div className="lg:col-span-1">
            <ScoreSummary analytics={analytics} />
          </div>

          {/* Subject Breakdown */}
          <div className="lg:col-span-2">
            <SubjectBreakdown analytics={subjectAnalytics} />
          </div>

          {/* Study Progress */}
          <div className="lg:col-span-3">
          <ImprovementTips improvements={improvementData} />
            
          </div>

          {/* Improvement Tips */}
          <div className="lg:col-span-2">
          <StudyProgress progress={progressData} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleRetake}
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Quiz
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}