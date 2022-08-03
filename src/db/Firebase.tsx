import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANlQbzf0SI4sbtR3-nwkVAx2SD71WDTF8",
    authDomain: "daecare-b0a22.firebaseapp.com",
    projectId: "daecare-b0a22",
    storageBucket: "daecare-b0a22.appspot.com",
    messagingSenderId: "61273069175",
    appId: "1:61273069175:web:d189edd7c42e75779d9872"
};
  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore();
  
  export { db };

  export default { app };