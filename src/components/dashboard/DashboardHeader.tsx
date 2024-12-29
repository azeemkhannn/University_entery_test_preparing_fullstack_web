import React from 'react';
import { Bell, Settings } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="h-16 flex items-center justify-end px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <Bell className="h-6 w-6 text-gray-500" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <Settings className="h-6 w-6 text-gray-500" />
          </button>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
}