import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole?: 'student' | 'faculty';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  // Retrieve values from localStorage
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const userType = localStorage.getItem('userType');

  // Check if the token and user data are valid
  const isAuthenticated = Boolean(token && user);
  const parsedUser = user ? JSON.parse(user) : null;

  // Verify user type if required
  if (requiredRole && userType !== requiredRole) {
    return <Navigate to={userType === 'student' ? '/dashboard' : '/faculty'} replace />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !parsedUser) {
    return <Navigate to="/auth" replace />;
  }

  // Allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;
