import React, { useEffect, useState } from 'react';
import AuthTabs from '../components/auth/AuthTabs';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const navigate = useNavigate()
    // const user = JSON.parse(localStorage.getItem('user'));
    // // const user = localStorage.getItem('user')
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
  


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {activeTab === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}