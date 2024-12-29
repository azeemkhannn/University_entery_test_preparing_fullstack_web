import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TestPrep Pro</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</a>
            <button className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
              Login
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}