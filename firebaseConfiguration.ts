// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3Bj3wI0dOXiDqwEOPNOavXuphh20ts3U",
  authDomain: "gymqr-90b02.firebaseapp.com",
  projectId: "gymqr-90b02",
  storageBucket: "gymqr-90b02.firebasestorage.app",
  messagingSenderId: "173351955418",
  appId: "1:173351955418:web:3aec96250cb0935d0b6ee3",
  measurementId: "G-WXHPKTSFYP",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);
