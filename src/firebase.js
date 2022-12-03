
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvMpHyRydsDHwJOZAQJ4mW3_j-kJ2sGqw",
  authDomain: "chatapp-b8e75.firebaseapp.com",
  projectId: "chatapp-b8e75",
  storageBucket: "chatapp-b8e75.appspot.com",
  messagingSenderId: "426524842545",
  appId: "1:426524842545:web:c4ef132fcf87bcff999310"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig) ;
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();