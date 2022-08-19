// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7cMsbKZp-aHi4e8wiYBNQbhdHmYL8HO0",
  authDomain: "crwn-clothing-db-9af46.firebaseapp.com",
  projectId: "crwn-clothing-db-9af46",
  storageBucket: "crwn-clothing-db-9af46.appspot.com",
  messagingSenderId: "351915232524",
  appId: "1:351915232524:web:5b29e9a1cd15101fd64d29",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
// every time someone interact with the provider we force
// to interact with an account.
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
