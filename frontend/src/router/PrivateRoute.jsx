import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('campusrecycletoken'); // Check if the user is authenticated

  if (!isAuthenticated) {
    alert('You need to be logged in to access this page. Redirecting to login page.');
    return <Navigate to="/student-login" />;
  }

  return children;
};

export default PrivateRoute;
