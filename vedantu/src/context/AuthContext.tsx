"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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
  course?: string;
  parentName?: string;
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

// Hardcoded admin/teacher accounts
const HARDCODED_ACCOUNTS: Record<string, { password: string; userData: User }> = {
  "admin@brilliantroots.com": {
    password: "admin123",
    userData: { name: "Administrator", email: "admin@brilliantroots.com", role: "admin" },
  },
  "teacher@brilliantroots.com": {
    password: "teacher123",
    userData: { name: "Teacher", email: "teacher@brilliantroots.com", role: "teacher" },
  },
};

// Helper to read user from localStorage safely
const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize immediately from localStorage so the page renders fast
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [loading, setLoading] = useState(false);

  // Listen to Firebase auth state changes in the background
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, "students", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const userData: User = {
              id: firebaseUser.uid,
              name: data.studentName || firebaseUser.displayName || "",
              email: firebaseUser.email || "",
              phone: data.phone,
              grade: data.studentClass,
              role: "student",
              course: data.course,
              parentName: data.parentName,
            };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          }
          // If no Firestore doc, keep whatever is in localStorage (admin/teacher)
        } catch {
          // Network error — keep current user from localStorage
        }
      } else {
        // Firebase says no user — only clear if there's no hardcoded account stored
        const stored = getStoredUser();
        if (stored && (stored.role === "admin" || stored.role === "teacher")) {
          // Keep hardcoded accounts; they don't go through Firebase Auth
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (
    credentials:
      | { username: string; password: string }
      | { email: string; password: string },
  ): Promise<boolean> => {
    setLoading(true);

    try {
      // Username-based login (legacy student login from localStorage)
      if ("username" in credentials) {
        const studentCredentials = JSON.parse(
          localStorage.getItem("studentCredentials") || "{}",
        );
        const foundCredential = Object.values(studentCredentials).find(
          (cred: any) =>
            cred.username === credentials.username &&
            cred.password === credentials.password,
        );

        if (foundCredential && typeof foundCredential === "object" && "email" in foundCredential) {
          const applications = JSON.parse(localStorage.getItem("studentApplications") || "[]");
          const application = applications.find(
            (app: any) => app.personalInfo.email === (foundCredential as any).email,
          );

          if (application) {
            const userData: User = {
              id: application.id,
              name: `${application.personalInfo.firstName} ${application.personalInfo.lastName}`,
              email: application.personalInfo.email,
              phone: application.personalInfo.phone,
              grade: application.academicInfo?.currentGrade,
              role: "student",
              applicationId: application.id,
              username: (foundCredential as any).username,
            };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setLoading(false);
            return true;
          }
        }
        setLoading(false);
        return false;
      }

      // Email login — check hardcoded accounts first
      if ("email" in credentials) {
        const hardcoded = HARDCODED_ACCOUNTS[credentials.email];
        if (hardcoded && hardcoded.password === credentials.password) {
          setUser(hardcoded.userData);
          localStorage.setItem("user", JSON.stringify(hardcoded.userData));
          setLoading(false);
          return true;
        }

        // Try Firebase Auth for student accounts
        try {
          await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          // onAuthStateChanged will handle setting the user
          setLoading(false);
          return true;
        } catch (firebaseError: any) {
          console.error("Firebase login error:", firebaseError.code);
          
          // LAST RESORT: Check for local demo students (bypass users)
          const localStudents = JSON.parse(localStorage.getItem('localStudents') || '[]');
          const localMatch = localStudents.find(
            (s: any) => s.email === credentials.email && s.password === credentials.password
          );

          if (localMatch) {
            const userData: User = {
              id: localMatch.id,
              name: localMatch.studentName,
              email: localMatch.email,
              phone: localMatch.phone,
              grade: localMatch.studentClass,
              role: "student",
              course: localMatch.course,
            };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setLoading(false);
            return true;
          }

          setLoading(false);
          return false;
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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {}
    setUser(null);
    localStorage.removeItem("user");
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
