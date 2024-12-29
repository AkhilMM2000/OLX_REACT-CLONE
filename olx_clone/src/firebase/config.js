// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAVCpd-8tRxuk4yJSEHigQ1-lsnaRWftDU",
  authDomain: "fir-822de.firebaseapp.com",
  projectId: "fir-822de",
  storageBucket: "fir-822de.firebasestorage.app",
  messagingSenderId: "758514833173",
  appId: "1:758514833173:web:95ecee0aa3c99479afbb1c",
  measurementId: "G-4Y3VM5QVYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore
const auth = getAuth(app); // Authentication
const analytics = getAnalytics(app); // Analytics

export { db, auth, analytics};
