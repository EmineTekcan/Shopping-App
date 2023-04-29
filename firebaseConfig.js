import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzeE0I3QOHSukcapgWTY5DtHHMYxWKfz0",
  authDomain: "e-commerce-53643.firebaseapp.com",
  projectId: "e-commerce-53643",
  storageBucket: "e-commerce-53643.appspot.com",
  messagingSenderId: "70792725168",
  appId: "1:70792725168:web:88216e3c8499a8bd6c3175"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
