// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1n5ilphpLnQARYFMxytlhsPl-6zZ1JY4",
  authDomain: "getbetterpodcast.firebaseapp.com",
  projectId: "getbetterpodcast",
  storageBucket: "getbetterpodcast.firebasestorage.app",
  messagingSenderId: "987843610101",
  appId: "1:987843610101:web:338c964ebc99d325248cbc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);