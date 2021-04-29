import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCK4cRMMqg4TP2EbVinMESGoe6XbVMujqg",
  authDomain: "tormetesting.firebaseapp.com",
  projectId: "tormetesting",
  storageBucket: "tormetesting.appspot.com",
  messagingSenderId: "924820813100",
  appId: "1:924820813100:web:3297c00aa8859ed3c52889",
  measurementId: "G-9RB3BB40BR",
};
const fb = firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default fb;
