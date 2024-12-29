import React, { useState } from 'react';
import { User, Mail, Phone, Lock, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType:'',
    educationLevel: '',
    acceptTerms: false,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong!');
        return;
      }
  
      const data = await response.json();
      
  
      // Store user data and token in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      localStorage.setItem('selectedTest', data.selectedTest);
  
      
      register(data.userType)
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Failed to register. Please try again.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            type="text"
            required
            className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="reg-email"
            type="email"
            required
            className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="phone"
            type="tel"
            required
            className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="reg-password"
            type="password"
            required
            className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="education" className="block text-sm font-medium text-gray-700">
          Education Level
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <GraduationCap className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="education"
            required
            className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.educationLevel}
            onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
          >
            <option value="">Select Education Level</option>
            <option value="intermediate">Intermediate</option>
            <option value="a-level">A-Level</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          User Type
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, userType: 'student' })}
            className={`py-2 px-4 rounded-lg text-sm font-medium ${
              formData.userType === 'student'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, userType: 'faculty' })}
            className={`py-2 px-4 rounded-lg text-sm font-medium ${
              formData.userType === 'faculty'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Faculty
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          checked={formData.acceptTerms}
          onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I accept the{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Terms and Conditions
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Account
      </button>
    </form>
  );
}
