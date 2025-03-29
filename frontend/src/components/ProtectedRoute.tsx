import React from "react";
import { Navigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading state while checking authentication
  }

  if (error || !user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <>{children}</>; // Render the protected content if authenticated
};

export default ProtectedRoute;