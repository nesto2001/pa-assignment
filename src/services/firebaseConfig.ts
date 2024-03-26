// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBMPt-50fWpqAqfSq2sQBMVEvAQ7MdCNX4",
  authDomain: "hotel-assignment-7c7d1.firebaseapp.com",
  projectId: "hotel-assignment-7c7d1",
  storageBucket: "hotel-assignment-7c7d1.appspot.com",
  messagingSenderId: "1090980063411",
  appId: "1:1090980063411:web:0ba1f5ae5a0166f7f3e8c6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
