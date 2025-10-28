import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBk-9hx2GrVoyGgmkd0Fhx6fQguj509iDs",
    authDomain: "websitebuilder-b1f96.firebaseapp.com",
    projectId: "websitebuilder-b1f96",
    storageBucket: "websitebuilder-b1f96.firebasestorage.app",
    messagingSenderId: "564237080138",
    appId: "1:564237080138:web:c34c7b93a37b03095778b3",
    measurementId: "G-FMP6XB4RQ7"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 