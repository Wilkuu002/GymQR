import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
