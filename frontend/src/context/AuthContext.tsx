import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    document.cookie = "jwt=; Max-Age=0; path=/;"; // Clear the cookie
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};