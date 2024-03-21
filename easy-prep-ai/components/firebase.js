// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  initializeAuth, 
  getReactNativePersistence 
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBbDPYtkeXrGdvSEbWq9rjMSKBqRu6e2Jw",
  authDomain: "easyprepai.firebaseapp.com",
  projectId: "easyprepai",
  storageBucket: "easyprepai.appspot.com",
  messagingSenderId: "412431130469",
  appId: "1:412431130469:web:0f2d0156db899411500b8c",
  measurementId: "G-80HZG2RSCL"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication with specific persistence for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Function to create a new user with email and password
const createUserWithEmailAndPassword = (email, password) => {
  return firebaseCreateUserWithEmailAndPassword(auth, email, password);
};

// Exporting the authentication instance, Firestore instance, and the createUserWithEmailAndPassword function
export { auth, createUserWithEmailAndPassword, db };
