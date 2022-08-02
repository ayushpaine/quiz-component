import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmcwcBXSGeZ2Apb0w155LKTu1dOk7eDFk",
  authDomain: "quiz-component-26a32.firebaseapp.com",
  projectId: "quiz-component-26a32",
  storageBucket: "quiz-component-26a32.appspot.com",
  messagingSenderId: "455372921567",
  appId: "1:455372921567:web:b2c50173758d10c045676a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default app;
export { db };
