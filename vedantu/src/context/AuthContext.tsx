"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
  preferredTiming?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  parentOccupation?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  previousSchool?: string;
  reasonForJoining?: string;
  howDidYouHear?: string;
  paymentStatus?: string;
  paymentAmount?: number;
  paymentDate?: string;
  paymentMethod?: string;
  applicationStatus?: string;
  applicationDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: () => boolean;
  isStudent: () => boolean;
  isTeacher: () => boolean;
  signup: (
    userData: Omit<User, "id" | "role"> & { password: string },
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin/teacher accounts
const HARDCODED_ACCOUNTS: Record<string, { password: string; userData: User }> =
  {
    "admin@brilliantroots.com": {
      password: "admin123",
      userData: {
        name: "Administrator",
        email: "admin@brilliantroots.com",
        role: "admin",
      },
    },
    "teacher@brilliantroots.com": {
      password: "teacher123",
      userData: {
        name: "Teacher",
        email: "teacher@brilliantroots.com",
        role: "teacher",
      },
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

// Map Firestore `users` doc → User shape
const mapFirestoreUserDoc = (uid: string, data: any): User => ({
  id: uid,
  name:
    data.name ||
    `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
    data.studentName,
  email: data.email || "",
  phone: data.phone,
  grade: data.grade || data.studentClass,
  role: data.role || "student", // Use role from Firestore, default to student
  course: data.interestedCourse || data.course,
  preferredTiming: data.preferredTiming || data.slot,
  parentName: data.parentName,
  parentPhone: data.parentPhone,
  parentEmail: data.parentEmail,
  parentOccupation: data.parentOccupation,
  address: data.address,
  city: data.city,
  state: data.state,
  postalCode: data.postalCode,
  previousSchool: data.previousSchool,
  reasonForJoining: data.reasonForJoining,
  howDidYouHear: data.howDidYouHear,
  username: data.username,
  applicationId: data.applicationId,
  paymentStatus: data.paymentStatus,
  paymentAmount: data.paymentAmount || data.courseFee,
  paymentDate: data.paymentDate,
  paymentMethod: data.paymentMethod,
  applicationStatus: data.applicationStatus,
  applicationDate: data.applicationDate,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [loading, setLoading] = useState(false);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Prefer `users` collection (new), fall back to `students` (legacy)
          let docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
          if (!docSnap.exists()) {
            docSnap = await getDoc(doc(db, "students", firebaseUser.uid));
          }

          if (docSnap.exists()) {
            const userData = mapFirestoreUserDoc(
              firebaseUser.uid,
              docSnap.data(),
            );
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));

            // If data came from 'users' collection, also ensure it's in 'students' collection
            if (docSnap.ref.path.includes("/users/")) {
              try {
                const studentDocRef = doc(db, "students", firebaseUser.uid);
                const studentDoc = await getDoc(studentDocRef);
                if (!studentDoc.exists()) {
                  // Create entry in students collection for course tracking
                  await setDoc(studentDocRef, {
                    studentName: userData.name,
                    parentName: userData.parentName,
                    studentClass: userData.grade,
                    email: userData.email,
                    phone: userData.phone,
                    course: userData.course,
                    slot: userData.preferredTiming,
                    role: userData.role,
                    password: docSnap.data().password || "", // Include password if available
                    createdAt: new Date().toISOString(),
                    courseFee: userData.paymentAmount || 0,
                  });
                }
              } catch (err) {
                console.warn("Failed to sync to students collection:", err);
              }
            }
          }
        } catch {
          // Network error — keep current localStorage user
        }
      } else {
        const stored = getStoredUser();
        if (stored && (stored.role === "admin" || stored.role === "teacher")) {
          // Keep hardcoded accounts; they don't use Firebase Auth
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    setLoading(true);

    try {
      // ── Email login: check hardcoded accounts first ──
      if ("email" in credentials) {
        const hardcoded = HARDCODED_ACCOUNTS[credentials.email];
        if (hardcoded && hardcoded.password === credentials.password) {
          setUser(hardcoded.userData);
          localStorage.setItem("user", JSON.stringify(hardcoded.userData));
          setLoading(false);
          return true;
        }

        // Firebase Auth for student accounts
        try {
          await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          // onAuthStateChanged handles setting the user
          setLoading(false);
          return true;
        } catch (firebaseError: any) {
          console.error("Firebase login error:", firebaseError.code);

          // Fallback to local storage
          const localStudents = JSON.parse(
            localStorage.getItem("localStudents") || "[]",
          );
          const localUser = localStudents.find(
            (s: any) =>
              (s.email === credentials.email ||
                s.username === credentials.email) &&
              s.password === credentials.password,
          );

          if (localUser) {
            const userData = {
              id: localUser.id || "local_" + Date.now(),
              name:
                localUser.name ||
                localUser.studentName ||
                `${localUser.firstName} ${localUser.lastName}`,
              email: localUser.email,
              role: "student" as const,
              course: localUser.course || localUser.interestedCourse,
              username: localUser.username,
              grade: localUser.grade || localUser.studentClass,
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

  const signup = async (
    data: Omit<User, "id" | "role"> & { password: string },
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    console.log("AuthContext: Starting signup with data:", data);

    try {
      // 1. Create user in Firebase Auth
      console.log("AuthContext: Creating Firebase Auth user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const firebaseUser = userCredential.user;
      console.log(
        "AuthContext: Firebase user created with UID:",
        firebaseUser.uid,
      );

      // 2. Generate required fields
      const applicationId =
        "BR" + Math.random().toString(36).substring(2, 9).toUpperCase();
      const username =
        data.email.split("@")[0].toLowerCase() +
        Math.floor(Math.random() * 1000);

      // 3. Prepare complete user data for Firestore with all fields
      const newUser: any = {
        // Basic info
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        grade: data.grade || "",

        // Security
        password: data.password, // Store password for reference

        // System fields
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        role: "student",
        applicationId: applicationId,
        username: username,

        // Course and timing
        course: data.course || null,
        preferredTiming: data.preferredTiming || null,

        // Parent info
        parentName: data.parentName || null,
        parentPhone: data.parentPhone || null,
        parentEmail: data.parentEmail || null,
        parentOccupation: data.parentOccupation || null,

        // Address info
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        postalCode: data.postalCode || null,

        // Additional info
        previousSchool: data.previousSchool || null,
        reasonForJoining: data.reasonForJoining || null,
        howDidYouHear: data.howDidYouHear || null,

        // Payment info
        paymentStatus: data.paymentStatus || "pending",
        paymentAmount: data.paymentAmount || null,
        paymentDate: data.paymentDate || null,
        paymentMethod: data.paymentMethod || null,

        // Application status
        applicationStatus: data.applicationStatus || "submitted",
        applicationDate: data.applicationDate || new Date().toISOString(),

        // Metadata
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("AuthContext: Prepared user data for Firestore:", newUser);
      console.log(
        "AuthContext: Number of fields to store:",
        Object.keys(newUser).length,
      );

      // 4. Store in Firestore `users` collection
      console.log("AuthContext: Storing user data in Firestore...");
      const docRef = doc(db, "users", firebaseUser.uid);
      await setDoc(docRef, newUser);
      console.log(
        "AuthContext: User data stored successfully in Firestore at:",
        docRef.path,
      );

      // 5. Verify the data was stored
      console.log("AuthContext: Verifying stored data...");
      const storedDoc = await getDoc(docRef);
      if (storedDoc.exists()) {
        console.log(
          "AuthContext: Verification successful - data exists in Firestore",
        );
        console.log(
          "AuthContext: Stored fields count:",
          Object.keys(storedDoc.data()).length,
        );
      } else {
        console.error(
          "AuthContext: Verification failed - data not found in Firestore!",
        );
      }

      // 6. Update local state
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      console.log("AuthContext: Local state updated");

      setLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("AuthContext: Signup error:", error);
      console.error("AuthContext: Error code:", error.code);
      console.error("AuthContext: Error message:", error.message);
      setLoading(false);
      let errorMessage = "An error occurred during signup.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      }
      return { success: false, error: errorMessage };
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
    signup,
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
