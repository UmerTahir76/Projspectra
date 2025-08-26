// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYch3YYJig8qPwS5iiwDzr50AdlcVs7dg",
  authDomain: "projspectra-521f3.firebaseapp.com",
  projectId: "projspectra-521f3",
  storageBucket: "projspectra-521f3.firebasestorage.app",
  messagingSenderId: "250594410132",
  appId: "1:250594410132:web:53252ed1c6001457197e81",
  measurementId: "G-FPW78R8JSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);