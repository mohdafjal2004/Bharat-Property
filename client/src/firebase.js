// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bharat-property.firebaseapp.com",
  projectId: "bharat-property",
  storageBucket: "bharat-property.appspot.com",
  messagingSenderId: "330818318887",
  appId: "1:330818318887:web:fbd87f8d72c7888df25402",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
