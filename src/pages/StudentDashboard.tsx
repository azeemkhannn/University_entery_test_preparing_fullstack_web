import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import UpcomingQuizzes from '../components/dashboard/UpcomingQuizzes';
import PerformanceSummary from '../components/dashboard/PerformanceSummary';
import StudyRecommendations from '../components/dashboard/StudyRecommendations';

export default function StudentDashboard() {
  // Mock user data (replace with actual user data from your auth system)
  const user = {
    name: 'John Doe',
    testType: 'NTS',
  };

  return (
    <DashboardLayout faculty=''>
      <div className="space-y-6">
        <WelcomeSection name={user.name} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingQuizzes testType={user.testType} />
          <PerformanceSummary />
        </div>
        <StudyRecommendations />
      </div>
    </DashboardLayout>
  );
}