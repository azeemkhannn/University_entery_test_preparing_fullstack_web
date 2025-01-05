import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PerformanceOverview from '../components/analysis/PerformanceOverview';
import TimeAnalysis from '../components/analysis/TimeAnalysis';
import AnswerReview from '../components/analysis/AnswerReview';
import RecommendationPanel from '../components/analysis/RecommendationPanel';

export default function QuizAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, feedback, quizDetails } = location.state || {};

  if (!result || !feedback) {
    navigate('/dashboard');
    return null;
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PerformanceOverview 
              score={feedback.score}
              performance={feedback.performance}
            />
            <div className="mt-8">
              <TimeAnalysis timeManagement={feedback.timeManagement} />
            </div>
            <div className="mt-8">
              <AnswerReview answers={result.answers} quizDetails = {quizDetails} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <RecommendationPanel recommendations={feedback.recommendations} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}