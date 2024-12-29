import React from 'react';

interface AuthTabsProps {
  activeTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
}

export default function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        className={`flex-1 py-4 text-center font-medium ${
          activeTab === 'login'
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('login')}
      >
        Login
      </button>
      <button
        className={`flex-1 py-4 text-center font-medium ${
          activeTab === 'register'
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('register')}
      >
        Register
      </button>
    </div>
  );
}