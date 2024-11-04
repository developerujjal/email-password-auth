// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdm5A44jbn2yby6tTWs60fon5jx8mJjwY",
  authDomain: "email-pass-auth-54712.firebaseapp.com",
  projectId: "email-pass-auth-54712",
  storageBucket: "email-pass-auth-54712.firebasestorage.app",
  messagingSenderId: "469667680444",
  appId: "1:469667680444:web:3b224fae25545d723fc0b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;