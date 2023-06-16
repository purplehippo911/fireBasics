// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { } from 'firebase/auth'; 
import { } from 'firebase/firestore'; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzQTm2FSHdwGKHIYbuT0aYs7pz2oLQxgU",
  authDomain: "esoteric-lodge-364409.firebaseapp.com",
  projectId: "esoteric-lodge-364409",
  storageBucket: "esoteric-lodge-364409.appspot.com",
  messagingSenderId: "197916570249",
  appId: "1:197916570249:web:140039b472cabb84810c58",
  measurementId: "G-RE619E5BBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(firebase);