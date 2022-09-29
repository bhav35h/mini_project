import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAJioMdYvoR_uccWCTiY0ya92-a_RXsCE0",
    authDomain: "mini-df31a.firebaseapp.com",
    projectId: "mini-df31a",
    storageBucket: "mini-df31a.appspot.com",
    messagingSenderId: "201824146062",
    appId: "1:201824146062:web:f49718250e3e1563ffefdf"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);