import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, loading, children }) => {
    console.log("user------",user,loading)
  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
