// src/routes/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserManagement from "../pages/UserManagement";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useAuth";

const AppRoutes = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUserProfile();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/user-management"); // Redirect to UserManagement if logged in
    }
  }, [user, isLoading, navigate]);
  return (
    <>
      
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      
    </>
  );
};

export default AppRoutes;
