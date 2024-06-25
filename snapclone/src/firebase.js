import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getAnalytics} from 'firebase/analytics'


const firebaseConfig = {
  apiKey: "AIzaSyBvD6rPtRif22QOVCimyQoYyg3lGqb0eVA",
  authDomain: "snapchat-clone-74d82.firebaseapp.com",
  projectId: "snapchat-clone-74d82",
  storageBucket: "snapchat-clone-74d82.appspot.com",
  messagingSenderId: "122045842215",
  appId: "1:122045842215:web:7184aee3b0af6eeb6f5f02"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the initialized Firebase app and the storage service
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);


  
  
