import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyALhWbDxaWhFnV2_pjw9rtXPDrMSgi19Vg",
  authDomain: "digitalskillora-56cd1.firebaseapp.com",
  projectId: "digitalskillora-56cd1",
  storageBucket: "digitalskillora-56cd1.firebasestorage.app",
  messagingSenderId: "591273526574",
  appId: "1:591273526574:web:416ce323daf9cf9c8ee6bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider options
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged
};
export type { FirebaseUser };
