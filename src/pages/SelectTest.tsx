import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Microscope,
  Cog,
  GraduationCap,
  BookOpen,
  Brain,
  ArrowRight,
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import axios from 'axios';

interface TestCard {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export default function SelectTest() {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const tests: TestCard[] = [
    {
      id: 'MCAT',
      name: 'MCAT',
      description:
        'Medical College Admission Test - Comprehensive assessment for aspiring medical students covering biology, chemistry, physics, and critical analysis.',
      icon: Microscope,
      color: 'from-rose-400 to-rose-600',
    },
    {
      id: 'ECAT',
      name: 'ECAT',
      description:
        'Engineering College Admission Test - Evaluates mathematics, physics, and logical reasoning skills for engineering program candidates.',
      icon: Cog,
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'NTS',
      name: 'NTS',
      description:
        'National Testing Service - General aptitude assessment measuring analytical thinking, verbal reasoning, and quantitative abilities.',
      icon: GraduationCap,
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 'SAT',
      name: 'SAT',
      description:
        'Scholastic Assessment Test - Standardized test evaluating reading, writing, and mathematics skills for college admissions.',
      icon: BookOpen,
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      id: 'HAT',
      name: 'HAT',
      description:
        'Higher Aptitude Test - Advanced assessment for graduate-level programs focusing on critical thinking and subject expertise.',
      icon: Brain,
      color: 'from-amber-400 to-amber-600',
    },
  ];

  useEffect(() => {
    
    const fetchSelectedTest = async () => {
      setLoading(true);
      
      try {
        
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user || !user._id) {
          console.warn('User not found in localStorage');
          return;
        }
        // API call to fetch the selected test type
        const response = await axios.get(
          `http://localhost:5000/index/user-testtype/${user._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.status === 200) {
          const data = response.data;
          if (data.selectedTest) {
            localStorage.setItem('selectedTest', data.selectedTest);
            setSelectedTest(data.selectedTest);
          }else{
            localStorage.removeItem('selectedTest');
            setSelectedTest(null);
            console.log('No test selected');
          }
        }
      } catch (error) {
        console.error('Failed to fetch selected test:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchSelectedTest();
  }, []);

  const handleTestSelect = async (testId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user || !user._id) {
        console.warn('User not found in localStorage');
        return;
      }
  
      const response = await fetch(`http://localhost:5000/index/user-selectedTest/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTest: testId,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.selectedTest) {
          localStorage.setItem('selectedTest', data.selectedTest);
          setSelectedTest(data.selectedTest);
          navigate(`/dashboard/start-quiz?test=${testId}`);
        }
      } else {
        console.error('Failed to update selected test:', await response.text());
      }
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };
  
  const handleReset = async () => {
    try {
      setLoading(true);
      // Simulate an API call to delete results
      // console.log(`Deleting results for test: ${selectedTest}`);
      // localStorage.removeItem('selectedTest');
      setSelectedTest(null);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response =  await fetch(`http://localhost:5000/index/user-reset/${user._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        localStorage.removeItem('selectedTest');
        setSelectedTest(null);
      }

    } catch (error) {
      console.error('Failed to reset test selection:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout faculty=''>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout faculty=''>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedTest ? `Selected Test: ${selectedTest}` : 'Select Your University Test'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {selectedTest
              ? 'You have already selected a test. You can reset it if you want to choose again. User reset completely deletes your test results. start from new'
              : "Choose the test you want to prepare for. We'll personalize your preparation journey based on your selection."}
          </p>
        </div>

        {!selectedTest ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <div
                key={test.id}
                className="relative group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${test.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                ></div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${test.color} text-white`}
                    >
                      {React.createElement(test.icon, { className: 'h-6 w-6' })}
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {test.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {test.name}
                  </h3>

                  <p className="text-gray-600 mb-6 min-h-[80px]">
                    {test.description}
                  </p>

                  <button
                    onClick={() => handleTestSelect(test.id)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-300"
                  >
                    <span>Start Preparation</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors duration-300"
            >
              Reset User
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
