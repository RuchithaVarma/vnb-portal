"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  phone?: string;
  grade?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to safely parse user from localStorage
const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error reading user from localStorage:", error);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  }
  return null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state directly from localStorage to avoid setState in effect
  const [user, setUser] = useState<User | null>(getStoredUser());
  const loading = false;

  const login = (userData: User) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
