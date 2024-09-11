// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Firebase Authentication
import { getFirestore } from "firebase/firestore";  // Firestore

// Your Firebase configuration (based on the provided API details)
const firebaseConfig = {
  apiKey: "AIzaSyAG2gL8QXZaayqoKXdSGkpeL9We2WC7UIk",
  authDomain: "dev-deakin-app-8e0ee.firebaseapp.com",
  projectId: "dev-deakin-app-8e0ee",
  storageBucket: "dev-deakin-app-8e0ee.appspot.com",
  messagingSenderId: "589841915245",
  appId: "1:589841915245:web:a72c8e9383108851564e64",
  measurementId: "G-7NYTCVKXZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);  // Use this auth for user sign-up and login
export const firestore = getFirestore(app);  // Use this to save user data

export default app;
