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
  measurementId: "G-YKGPNY7KWD",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to Firestore emulator in development (Uncomment if needed)
// if (process.env.NODE_ENV === 'development') {
//   try {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//     console.log('Connected to Firestore emulator');
//   } catch (e) {
//     console.log('Firestore emulator already connected');
//   }
// }

// Initialize Analytics safely with error handling
const analytics =
  typeof window !== "undefined"
    ? isSupported()
        .then((supported) => {
          if (supported) {
            try {
              return getAnalytics(app);
            } catch (error) {
              console.warn("Analytics initialization failed:", error);
              return null;
            }
          }
          return null;
        })
        .catch((error) => {
          console.warn("Analytics support check failed:", error);
          return null;
        })
    : Promise.resolve(null);

export { app, auth, db, analytics };
