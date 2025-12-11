// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1xWuWe5ogxHa5D4Ah2qMCLvSW8eesbDU",
  authDomain: "bloodlink-2d9d9.firebaseapp.com",
  projectId: "bloodlink-2d9d9",
  storageBucket: "bloodlink-2d9d9.firebasestorage.app",
  messagingSenderId: "492977632474",
  appId: "1:492977632474:web:937461e2e5585f84e3a1e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);