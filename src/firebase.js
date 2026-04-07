// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, setDoc, doc} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE5QDqxUZ2wcQ5Cg_MGjmEmB84DeOe96E",
  authDomain: "ecom-store-cbe4f.firebaseapp.com",
  projectId: "ecom-store-cbe4f",
  storageBucket: "ecom-store-cbe4f.firebasestorage.app",
  messagingSenderId: "720229239250",
  appId: "1:720229239250:web:b0baeeda0fdedfbeba600b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth, provider, db, doc, setDoc}