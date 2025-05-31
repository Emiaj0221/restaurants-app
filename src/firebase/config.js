import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlLL0qTuWQQH3Fnxw40hHe7d5332n08xI",
  authDomain: "mesa-virtual-32b7a.firebaseapp.com",
  projectId: "mesa-virtual-32b7a",
  storageBucket: "mesa-virtual-32b7a.firebasestorage.app",
  messagingSenderId: "35000621006",
  appId: "1:35000621006:web:e184b8f50b505b7f963d9f"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

const FirebaseFirestore = getFirestore(FirebaseApp);

export {
  FirebaseFirestore
}