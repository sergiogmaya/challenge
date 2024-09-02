import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
