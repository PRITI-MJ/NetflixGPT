// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW1kQTXPh6Jg-qBNNUNHnl7Ehqv2EwkYQ",
  authDomain: "netflixgpt-f2ee9.firebaseapp.com",
  projectId: "netflixgpt-f2ee9",
  storageBucket: "netflixgpt-f2ee9.firebasestorage.app",
  messagingSenderId: "405058375869",
  appId: "1:405058375869:web:e56c747fe4c3e56af727d4",
  measurementId: "G-BYJ1QKWXBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();