"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  simpleUser: any;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  simpleUser: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [simpleUser, setSimpleUser] = useState<any>(null);

  useEffect(() => {
    // Check for simple admin login first
    const storedAdmin = localStorage.getItem("adminUser");
    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin);
        if (adminData.email === "rawpowders@gmail.com" && adminData.isAdmin) {
          setSimpleUser(adminData);
          setIsAdmin(true);
          setLoading(false);
          return;
        }
      } catch (error) {
        localStorage.removeItem("adminUser");
      }
    }

    // Fall back to Firebase auth
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        // Check hardcoded admin credentials first
        if (user.email === "rawpowders@gmail.com") {
          setIsAdmin(true);
        } else {
          // Check if user is admin in Firestore
          // We assume a 'users' collection where doc ID is uid and has field role: 'admin'
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && userDoc.data().role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } catch (error) {
            console.error("Error checking admin status:", error);
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, simpleUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
