// src\components\PrivateRoute.js
// checks if the user is logged in before rendering protected pages like Dashboard, Scan, Reports.
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function PrivateRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" replace />;
}
