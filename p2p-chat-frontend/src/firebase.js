import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdkcqGW79dp_JVzYltSnF8MuUGNS-yrCQ",
  authDomain: "chat-app-4500f.firebaseapp.com",
  projectId: "chat-app-4500f",
  storageBucket: "chat-app-4500f.appspot.com",
  messagingSenderId: "930997483173",
  appId: "1:930997483173:web:877d356ac0070894fcbf4c",
  measurementId: "G-YDFTYCLFWE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Make auth accessible in console (dev only)
if (typeof window !== "undefined") {
  window._auth = auth;
}

export { auth, provider, signInWithPopup };
