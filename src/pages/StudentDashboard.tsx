import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import UpcomingQuizzes from '../components/dashboard/UpcomingQuizzes';
import PerformanceSummary from '../components/dashboard/PerformanceSummary';
import StudyRecommendations from '../components/dashboard/StudyRecommendations';

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null); // Initialize user as null
  const [selectedTest, setSelectedTest] = useState<string>(''); 
  const [quizdata, setQuizdata] = useState<any[]>([]); // Initialize as an empty array
  const [recentresults, setRecentResults] = useState<any[]>([]); // Initialize as an empty array
  const [recommendations, setRecommendations] = useState<any[]>([]); // Initialize as an empty array

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const storedTest = localStorage.getItem('selectedTest') || '';

    setUser(storedUser);
    setSelectedTest(storedTest);

    if (storedUser._id && storedTest) {
      handledata(storedUser._id, storedTest);
    }
  }, []); // Only run once when the component mounts

  const handledata = async (userId: string, selectedTest: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          selectedTest: selectedTest
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Update state with the response data
      setQuizdata(data.upcomingQuizzes || []);
      setRecentResults(data.recentResults || []);
      setRecommendations(data.recommendations?.recommendations || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <DashboardLayout faculty=''>
      <div className="space-y-6">
        <WelcomeSection name={user?.name || 'Guest'} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingQuizzes quizzes={quizdata} testType={selectedTest} />
          <PerformanceSummary results={recentresults} />
        </div>
        <StudyRecommendations recommendations={recommendations} />
      </div>
    </DashboardLayout>
  );
}
