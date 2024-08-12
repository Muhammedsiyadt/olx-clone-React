import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKk-PjNqrBPc0-9HsdjylPBy4VLlxY82c",
  authDomain: "olx-clone-a7abc.firebaseapp.com",
  projectId: "olx-clone-a7abc",
  storageBucket: "olx-clone-a7abc.appspot.com",
  messagingSenderId: "756257567760",
  appId: "1:756257567760:web:4d890ab360a6e10b5ec695"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
