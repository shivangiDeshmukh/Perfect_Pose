// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABCZB2TRB7LCCBTd3ZNXIDX0uo55fxMVM",
    authDomain: "perfectpose-a8849.firebaseapp.com",
    projectId: "perfectpose-a8849",
    storageBucket: "perfectpose-a8849.appspot.com",
    messagingSenderId: "198959486650",
    appId: "1:198959486650:web:5f2550131e47c4129d5483"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
const db1 = getFirestore(app);
export { app, auth, db, db1 };
