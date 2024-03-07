import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBbDPYtkeXrGdvSEbWq9rjMSKBqRu6e2Jw",
  authDomain: "easyprepai.firebaseapp.com",
  projectId: "easyprepai",
  storageBucket: "easyprepai.appspot.com",
  messagingSenderId: "412431130469",
  appId: "1:412431130469:web:0f2d0156db899411500b8c",
  measurementId: "G-80HZG2RSCL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Function to create a new user with email and password
const signUpWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};


// Function to sign in with email and password
const signInWithEmailAndPasswordFunc = (email, password) => {
    return signUpWithEmailAndPassword(auth, email, password);
  };
export { auth, signUpWithEmailAndPassword, signInWithEmailAndPasswordFunc }