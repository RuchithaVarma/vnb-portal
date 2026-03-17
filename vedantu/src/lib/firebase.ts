import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAcCgHfU9nXzz0GxSGbcvMrQwQ5FFAq1aQ",
  authDomain: "brilliantroots-27ce3.firebaseapp.com",
  projectId: "brilliantroots-27ce3",
  storageBucket: "brilliantroots-27ce3.firebasestorage.app",
  messagingSenderId: "429371611993",
  appId: "1:429371611993:web:df4f67b279c69683db8a48",
  measurementId: "G-37477X5F69"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to Firestore emulator in development
if (process.env.NODE_ENV === 'development') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('Connected to Firestore emulator');
  } catch (e) {
    console.log('Firestore emulator already connected');
  }
}

// Initialize Analytics safely
const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export { app, auth, db, analytics };
