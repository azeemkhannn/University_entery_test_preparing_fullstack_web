import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ActivityChart from '../components/faculty/ActivityChart';
import QuizList from '../components/faculty/QuizList';
import RecentActivity from '../components/faculty/RecentActivity';
import StatsGrid from '../components/faculty/StatsGrid';
import axios from 'axios';

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const refresheffect = ()=>{
    setRefreshKey((prevKey) => prevKey + 1);
  }
    useEffect(() => {
      const user = localStorage.getItem('user');
      const userType = localStorage.getItem('userType');
      if (!user || userType !== 'faculty') {
        navigate('/');
      }
      fetchdata();

    }, [refreshKey, navigate]);

  const fetchdata = async () => {
    try {
      const response = await axios.get('http://localhost:5000/index/user-quiz');

      if (response.data) {
        setstats([
          {
            ...stats[0],
            value: response.data.studentCount?.toString() || '0',
          },
          {
            ...stats[1],
            value: response.data.facultyCount?.toString() || '0',
          },
          {
            ...stats[2],
            value: response.data.quizCount?.toString() || '0',
          },
        ]);
      }
    } catch (error) {
      console.warn(error.response?.message || error.message || 'An error occurred');
    }
  };


  const [stats, setstats] = useState([
    {
      id: 1,
      name: 'Total Students',
      value: '2,345',
      icon: Users,

      positive: true
    },
    {
      id: 2,
      name: 'Total Admin',
      value: '345',
      icon: Users,

      positive: true
    },
    {
      id: 3,
      name: 'Active Quizzes',
      value: '48',
      icon: BookOpen,

      positive: true
    },


  ]);




  return (
    <DashboardLayout faculty="faculty">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your quizzes and monitor student progress
            </p>
          </div>
          <button
            onClick={() => navigate('/faculty/create-quiz')}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Quiz
          </button>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Main Content */}
        {/* <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8"> */}
        {/* Activity Chart */}
        {/* <div className="lg:col-span-2">
            <ActivityChart />
          </div> */}

        {/* Recent Activity */}
        {/* <div className="lg:col-span-1">
            <RecentActivity />
          </div> */}
        {/* </div> */}

        {/* Quiz Management */}
        <div className="mt-8">
          <QuizList refresheffect={refresheffect} />
        </div>
      </div>
    </DashboardLayout>
  );
}