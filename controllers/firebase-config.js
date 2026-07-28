import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Sustituye estos valores con las credenciales obtenidas de tu Consola de Firebase
const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROJECT_ID.firebaseapp.com",
  projectId:         "TU_PROJECT_ID",
  storageBucket:     "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId:             "TU_APP_ID"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

export { app, auth, db };