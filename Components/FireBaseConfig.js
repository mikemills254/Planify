import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from  "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBzNk2ofnbUGBa1dsDiUT4Totbsp0VQBDo",
  authDomain: "planfy-e5014.firebaseapp.com",
  projectId: "planfy-e5014",
  storageBucket: "planfy-e5014.appspot.com",
  messagingSenderId: "11167998796",
  appId: "1:11167998796:web:80da83ba13fa3f256ba5e9"
};

export const app = initializeApp(firebaseConfig);
export const Db = getFirestore(app);
export const auth = getAuth(app)
