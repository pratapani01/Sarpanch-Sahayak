import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Check for the token

  // If a token exists, allow access to the nested routes (Outlet).
  // Otherwise, redirect to the /login page.
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;