// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr9C-xW1WesCbWwz5P7aQ4FEHIHc-Su0c",
  authDomain: "psychologists-app-c22b6.firebaseapp.com",
  databaseURL:
    "https://psychologists-app-c22b6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "psychologists-app-c22b6",
  storageBucket: "psychologists-app-c22b6.firebasestorage.app",
  messagingSenderId: "482983677035",
  appId: "1:482983677035:web:c4271fda069ba6a218752e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
