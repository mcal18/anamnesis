import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKlKRHLXZgAPHvx7QVczO6u_MKBcEGKG8",
  authDomain: "anamnesis-9630c.firebaseapp.com",
  projectId: "anamnesis-9630c",
  storageBucket: "anamnesis-9630c.firebasestorage.app",
  messagingSenderId: "604865224738",
  appId: "1:604865224738:web:e5ffa721030b02c98b2a7b",
  measurementId: "G-PN2K00729B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export default app