import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import UpcomingQuizzes from '../components/dashboard/UpcomingQuizzes';
import PerformanceSummary from '../components/dashboard/PerformanceSummary';
import StudyRecommendations from '../components/dashboard/StudyRecommendations';

export default function StudentDashboard() {
 const [user,setuser] = useState('')
 const [selectedTest,setselectedtest] = useState('')
 const [quizdata,setquizdata] = useState([])
 const [recentresults,setrecentresults] = useState([])
  // Mock user data (replace with actual user data from your auth system)
useEffect(()=>{
setuser(JSON.parse(localStorage.getItem('user') || '{}'));
setselectedtest(localStorage.getItem('selectedTest')||'');
handledata();
},[selectedTest])

const handledata = async () => {
  try {
     // Ensure `selectedTest` is properly defined
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user._id) {
      throw new Error('User not found in localStorage.');
    }

    const response = await fetch('http://localhost:5000/api/dashboard/', {
      method: 'POST', // Use uppercase for method for consistency
      body: JSON.stringify({
        userId: user._id,
        selectedTest
      }),
      headers: {
        'Content-Type': 'application/json', // Fix the Content-Type value
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Template literal for better readability
      }
    });

    if (!response.ok) {
      // If response is not OK, throw an error with the status
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    setquizdata(data.upcomingQuizzes); // Update quiz data state
    setrecentresults(data.recentResults); // Update recent results
    console.log(data);

  } catch (error) {
    console.error('Error fetching data:', error); // Provide a descriptive error log
  }
};



  // const user = {
  //   name: 'John Doe',
  //   testType: 'NTS',
  // };

  return (
    <DashboardLayout faculty=''>
      <div className="space-y-6">
        <WelcomeSection name={user.name} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingQuizzes quizzes={quizdata} testType={selectedTest} />
          <PerformanceSummary  results = {recentresults}/>
        </div>
        <StudyRecommendations />
      </div>
    </DashboardLayout>
  );
}