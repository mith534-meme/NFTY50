import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDJWJeaaF7zMxb1tYnbnMe-I9zMKeEsw_4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nfty50-159b9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nfty50-159b9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nfty50-159b9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "134481738156",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:134481738156:web:2281fc202ff938ba336209",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PY5VJTGBMK",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
