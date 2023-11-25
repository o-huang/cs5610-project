// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBcYA56ozA4wBm4jhL2vIgPlR02gGGyWvI",

  authDomain: "cs5610-project-5a80e.firebaseapp.com",

  projectId: "cs5610-project-5a80e",

  storageBucket: "cs5610-project-5a80e.appspot.com",

  messagingSenderId: "181021547041",

  appId: "1:181021547041:web:dc32bc0e77e772501e2160",

  measurementId: "G-RQEVNZNJWK"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
