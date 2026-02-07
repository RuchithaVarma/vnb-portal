import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5_DFNmSNVvLF_OKaK7E2llulN8vYc8Zo",
  authDomain: "bloomsraw-e2af6.firebaseapp.com",
  projectId: "bloomsraw-e2af6",
  storageBucket: "bloomsraw-e2af6.firebasestorage.app",
  messagingSenderId: "308381166050",
  appId: "1:308381166050:web:ceb32b2e281f1f525331bb",
  measurementId: "G-N2E77KQ2P4"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, auth, storage, analytics };
