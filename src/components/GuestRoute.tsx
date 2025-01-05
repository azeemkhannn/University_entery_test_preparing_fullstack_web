import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute: React.FC = () => {
  // Check if the user is logged in
  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(token);

  // Redirect to the respective dashboard if authenticated
  if (isAuthenticated) {
    const userType = localStorage.getItem('userType');
    return <Navigate to={userType === 'student' ? '/dashboard' : '/faculty'} replace />;
  }

  // Allow access to guest routes
  return <Outlet />;
};

export default GuestRoute;
