import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading state while checking authentication
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <>{children}</>; // Render the protected content if authenticated
};

export default ProtectedRoute;