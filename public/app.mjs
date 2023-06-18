 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js";
 import {
   GoogleAuthProvider,
   getAuth,
   signOut,
   signInWithPopup,
   onAuthStateChanged
 } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
 import {
   getFirestore,
   collection,
   addDoc,
   serverTimestamp,
   where,
   orderBy,
   query,
   onSnapshot
  } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";

 import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyBzQTm2FSHdwGKHIYbuT0aYs7pz2oLQxgU",
   authDomain: "esoteric-lodge-364409.firebaseapp.com",
   projectId: "esoteric-lodge-364409",
   storageBucket: "esoteric-lodge-364409.appspot.com",
   messagingSenderId: "197916570249",
   appId: "1:197916570249:web:140039b472cabb84810c58",
   measurementId: "G-RE619E5BBD",
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 // authentication
 const auth = getAuth();
 const provider = new GoogleAuthProvider();

 // DOM elements
 const whenSignedIn = document.querySelector("#whenSignedIn");
 const whenSignedOut = document.querySelector("#whenSignedOut");

 const signInBtn = document.querySelector("#signInBtn");
 const signOutBtn = document.querySelector("#signOutBtn");

 const userDetails = document.querySelector("#userDetails");

 // log in
 signInBtn.addEventListener("click", () => {
   signInWithPopup(auth, provider);
 });

 // auth 
 onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = 
    `<h3>Hello ${user.displayName}!</h3>
     <img src=${user.photoURL} alt="Profile Image"/>
     <p>User ID: ${uid}</p>
     <p>Email: ${user.email}</p>
    `
  } else {
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
  }

 })

 // sign out
 signOutBtn.addEventListener("click", () => signOut(auth));

// Get a Firestore instance - database
const db = getFirestore(app);

const createThing = document.querySelector("#createThing");
const thingsList = document.querySelector("#thingsList");

// reference to the document or collection want to access
let thingsRef;

// turn of realtime stream
let unsubscribe;

onAuthStateChanged(auth, user => {

  if (user) {

    thingsRef = collection(db, 'things');

    createThing.addEventListener("click", () => {
      addDoc(thingsRef, {
        uid: user.uid,
        name: faker.commerce.productName(),
        timestamp: serverTimestamp()
      });
    });
    
    // query reference to get users id
  const queryRef = query(
    thingsRef,
    where('uid', '==', user.uid),
    orderBy('timestamp')
  );

  unsubscribe = onSnapshot(
    queryRef, querySnapshot => {
      const items = querySnapshot.docs.map(doc => {
        return `<li>${ doc.data().name }</li>`
      });
      
      thingsList.innerHTML = items.join('');
    });
  }
  else {
    unsubscribe && unsubscribe();
  }
});
