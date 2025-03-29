// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Login />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* Add other pages here */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
