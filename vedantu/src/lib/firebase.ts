import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDtM1PN2kZX8mghjUIq8yQ5A5trHxlRCGw",
  authDomain: "brilliantroots-541a2.firebaseapp.com",
  projectId: "brilliantroots-541a2",
  storageBucket: "brilliantroots-541a2.firebasestorage.app",
  messagingSenderId: "446712229144",
  appId: "1:446712229144:web:ce7c30c8ce5c4ea085426d",
  measurementId: "G-YKGPNY7KWD"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics safely
const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export { app, auth, db, analytics };
