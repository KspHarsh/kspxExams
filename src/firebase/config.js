import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyB4Izle0l-l2pVWnyBM-U3OLHddb6jGqC8",
  authDomain: "kspxexams05.firebaseapp.com",
  projectId: "kspxexams05",
  storageBucket: "kspxexams05.firebasestorage.app",
  messagingSenderId: "401566827445",
  appId: "1:401566827445:web:70d9ca2ca385d4154d4ffc",
  measurementId: "G-S1H5D5QNQE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
