// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7IyTXdIaB8YPno5OtRJnwQfGwbmKulzY",
  authDomain: "project-management-app-7132b.firebaseapp.com",
  projectId: "project-management-app-7132b",
  storageBucket: "project-management-app-7132b.appspot.com",
  messagingSenderId: "962810837595",
  appId: "1:962810837595:web:fca9281c4f49f0839a9d7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const timestamp = getFirestore(app).FieldValue.serverTimestamp;
