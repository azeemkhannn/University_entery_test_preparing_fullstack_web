import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardList, BarChart2, Brain as BrainIcon } from 'lucide-react';
import BenefitCard from './BenefitCard';

export default function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));
  // const user = localStorage.getItem('user')
  // useEffect(()=>{
  // if(user){
  //   if(user.userType == 'student'){
  //     navigate('/dashboard')
  //   }
  //   if(user.userType =='faculty'){
  //     navigate('/faculty')
  //   } }
  //   return
  // },[navigate])


  const benefits = [
    {
      icon: ClipboardList,
      title: 'Mock Tests',
      description: 'Access comprehensive mock tests designed to simulate real entry exams.',
    },
    {
      icon: BarChart2,
      title: 'Performance Analysis',
      description: 'Get detailed feedback and personalized improvement recommendations.',
    },
    {
      icon: BrainIcon,
      title: 'Personalized Study Plan',
      description: 'Follow a customized study plan tailored to your strengths and weaknesses.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prepare for Your University Entry Test
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Comprehensive preparation platform with mock tests, analysis, and personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="inline-block bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Register Now
              </Link>
              <Link
                to="/auth"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition-colors border border-indigo-500"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Email: support@testprep.com</p>
              <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Test Prep Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}