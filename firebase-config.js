// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDH5xYCsSRrpg5mABkoDOnuGU1DWqpIEak",
  authDomain: "symmetrical-2fa.firebaseapp.com",
  projectId: "symmetrical-2fa",
  storageBucket:"symmetrical-2fa.firebasestorage.app",
  messagingSenderId: "856414220285",
  appId: "1:856414220285:web:71c26fe6621b594747b394",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);