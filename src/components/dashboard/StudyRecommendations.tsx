import React from 'react';
import { BookOpen, Brain, Beaker, Activity, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Recommendation {
  _id: string;
  title: string;
  category: string;
  subject: string;
  difficulty: string;
}
interface RecommendationPanelProps {
  recommendations: Recommendation[];
}

export default function StudyRecommendations({ recommendations }: RecommendationPanelProps) {

  const navigate = useNavigate()


  // Map subject/category to an icon
  const getIcon = (subject: string | null) => {
    switch (subject?.toLowerCase()) {
      case 'biology':
        return Brain;
      case 'chemistry':
        return Beaker;
      case 'physics':
        return Activity;
      case 'geography':
        return Globe;
      default:
        return BookOpen;
    }
  };

  const handlestart = (testType:string,quizId:string,subject:string)=>{
    navigate(`/dashboard/start-quiz?test=${testType}&quizid=${quizId}&type=${subject}`);

  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recommended Study Areas</h2>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => {
          const Icon = getIcon(item.subject); // Dynamically set icon
          return (
            <div
              key={item._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <span
                  className={`ml-2 text-sm px-2 py-1 rounded-full ${
                    item.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800'
                      : item.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.difficulty}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                Subject: {item.subject} <br />
                Category: {item.category}
              </p>
              <button className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
              onClick={()=> handlestart(item.category,item._id,item.subject)}
              >
                Start Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
