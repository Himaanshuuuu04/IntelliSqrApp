// src/routes/index.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserManagement from "../pages/UserManagement";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;
