// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_q10vbrKhE-AqxhS0u1ylcQXz0ucuxfE",
  authDomain: "int305fb057-b55f5.firebaseapp.com",
  projectId: "int305fb057-b55f5",
  storageBucket: "int305fb057-b55f5.firebasestorage.app",
  messagingSenderId: "766923511271",
  appId: "1:766923511271:web:5f72ce77fe5f2ff26f5942",
  measurementId: "G-QSSRF25CHE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore();

export default db;
