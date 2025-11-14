import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1n5ilphpLnQARYFMxytlhsPl-6zZ1JY4",
  authDomain: "getbetterpodcast.firebaseapp.com",
  projectId: "getbetterpodcast",
  storageBucket: "getbetterpodcast.firebasestorage.app",
  messagingSenderId: "987843610101",
  appId: "1:987843610101:web:338c964ebc99d325248cbc",
  measurementId: "G-HLJEWK11J4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);