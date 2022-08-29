import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const app = firebase.initializeApp({
    apiKey: "AIzaSyCeTU5P7812AEKgwZ8Sn3hemyj8f1rxpO0",
    authDomain: "apollo-95f0f.firebaseapp.com",
    projectId: "apollo-95f0f",
    storageBucket: "apollo-95f0f.appspot.com",
    messagingSenderId: "751959423652",
    appId: "1:751959423652:web:2fe23304ab75f2053c8431",
    measurementId: "G-VFYDZJXZEY"
})

const auth = firebase.auth();
export { auth, getAuth, RecaptchaVerifier, signInWithPhoneNumber };

export default app;