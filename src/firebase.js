import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFhzR1dhjkiQyrysg9DZP3hHCQJoowboI",
  authDomain: "finley-28440.firebaseapp.com",
  projectId: "finley-28440",
  storageBucket: "finley-28440.firebasestorage.app",
  messagingSenderId: "561372927401",
  appId: "1:561372927401:web:1b7983a45ba1328337e0b8",
  measurementId: "G-S3428ZY2EK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
