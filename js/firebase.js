// ─── Firebase SDK Initialization ─────────────────────────
// This file initializes the Firebase app and exports the auth instance.
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgSlk4wZO7RxUs-xe4ByNz2kk8ZQQoEWE",
  authDomain: "abossey-okai-magazine.firebaseapp.com",
  projectId: "abossey-okai-magazine",
  storageBucket: "abossey-okai-magazine.firebasestorage.app",
  messagingSenderId: "662566542988",
  appId: "1:662566542988:web:38584d5330b90dfc0ce5a9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure robust persistence to prevent IndexedDB "Database is closing/hidden" browser errors
setPersistence(auth, browserLocalPersistence).catch(() => {
  setPersistence(auth, inMemoryPersistence).catch(() => {});
});

export { app, auth };
