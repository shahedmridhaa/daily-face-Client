// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIGgexPSuE71ur8CLN5bl5g-kJd1bGveA",
  authDomain: "dailyface-b4ffd.firebaseapp.com",
  projectId: "dailyface-b4ffd",
  storageBucket: "dailyface-b4ffd.appspot.com",
  messagingSenderId: "205485294175",
  appId: "1:205485294175:web:bb3d72cf043e3ad6c7d1ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app