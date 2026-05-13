// // // src/firebase/firebase.init.js
// // import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyDJ4_rPOSAUJkoSgDAB5oVBejk3aIOxSd8",
// //   authDomain: "festmanagement-934ce.firebaseapp.com",
// //   projectId: "festmanagement-934ce",
// //   storageBucket: "festmanagement-934ce.firebasestorage.app",
// //   messagingSenderId: "1044737249801",
// //   appId: "1:1044737249801:web:a469912d08f3974696ded8",
// //   measurementId: "G-PFB492W8H6"
// // };

// // const app = initializeApp(firebaseConfig);
// // export const auth = getAuth(app);
// // export const db = getFirestore(app);




// // src/firebase/firebase.init.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database"; // ✅ Changed to Realtime DB
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyDJ4_rPOSAUJkoSgDAB5oVBejk3aIOxSd8",
//   authDomain: "festmanagement-934ce.firebaseapp.com",
//   projectId: "festmanagement-934ce",
//   storageBucket: "festmanagement-934ce.firebasestorage.app",
//   messagingSenderId: "1044737249801",
//   appId: "1:1044737249801:web:a469912d08f3974696ded8",
//   measurementId: "G-PFB492W8H6",
//   databaseURL: "https://festmanagement-934ce-default-rtdb.firebaseio.com/" // ✅ Add this
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const database = getDatabase(app); // ✅ Realtime Database
// export const analytics = getAnalytics(app);










// src/firebase/firebase.init.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

// Read values from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const database = getDatabase(app);

// Analytics works only in browser environments that support it
export let analytics = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export default app;