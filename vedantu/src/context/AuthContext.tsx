"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  grade?: string;
  avatar?: string;
  role: "admin" | "student" | "teacher";
  applicationId?: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    credentials:
      | { username: string; password: string }
      | { email: string; password: string },
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: () => boolean;
  isStudent: () => boolean;
  isTeacher: () => boolean;
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
  const [loading, setLoading] = useState(false);

  const login = async (
    credentials:
      | { username: string; password: string }
      | { email: string; password: string },
  ): Promise<boolean> => {
    setLoading(true);

    try {
      // Check if it's a student login with username/password
      if ("username" in credentials) {
        const studentCredentials = JSON.parse(
          localStorage.getItem("studentCredentials") || "{}",
        );
        const foundCredential = Object.values(studentCredentials).find(
          (cred: any) =>
            cred.username === credentials.username &&
            cred.password === credentials.password,
        );

        if (
          foundCredential &&
          typeof foundCredential === "object" &&
          "email" in foundCredential
        ) {
          // Find the application details
          const applications = JSON.parse(
            localStorage.getItem("studentApplications") || "[]",
          );
          const application = applications.find(
            (app: any) =>
              app.personalInfo.email === (foundCredential as any).email,
          );

          if (application) {
            const userData: User = {
              id: application.id,
              name: `${application.personalInfo.firstName} ${application.personalInfo.lastName}`,
              email: application.personalInfo.email,
              phone: application.personalInfo.phone,
              grade: application.academicInfo.currentGrade,
              role: "student",
              applicationId: application.id,
              username: (foundCredential as any).username,
            };

            setUser(userData);
            if (typeof window !== "undefined") {
              localStorage.setItem("user", JSON.stringify(userData));
            }
            setLoading(false);
            return true;
          }
        }
      }
      // Check if it's an admin login with email/password
      else if ("email" in credentials) {
        // For demo: admin@brilliantroots.com / admin123
        if (
          credentials.email === "admin@brilliantroots.com" &&
          credentials.password === "admin123"
        ) {
          const adminData: User = {
            name: "Administrator",
            email: credentials.email,
            role: "admin",
          };

          setUser(adminData);
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(adminData));
          }
          setLoading(false);
          return true;
        }

        // For demo: teacher@brilliantroots.com / teacher123
        if (
          credentials.email === "teacher@brilliantroots.com" &&
          credentials.password === "teacher123"
        ) {
          const teacherData: User = {
            name: "Teacher",
            email: credentials.email,
            role: "teacher",
          };

          setUser(teacherData);
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(teacherData));
          }
          setLoading(false);
          return true;
        }
      }

      setLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  const isAdmin = () => user?.role === "admin";
  const isStudent = () => user?.role === "student";
  const isTeacher = () => user?.role === "teacher";

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
    isAdmin,
    isStudent,
    isTeacher,
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
