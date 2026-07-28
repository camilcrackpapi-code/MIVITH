import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDK2B1wJe2TpYvfyeQZM0i0sjeMNOR7H1A",
  authDomain: "mivith.firebaseapp.com",
  projectId: "mivith",
  storageBucket: "mivith.firebasestorage.app",
  messagingSenderId: "964463664776",
  appId: "1:964463664776:web:91588eb4f604134a4fc93d"
};

// Inicializar Firebase (Corregido el cierre del paréntesis)
const app = initializeApp(firebaseConfig);

// Exportar la autenticación para usarla en login.js
export const auth = getAuth(app);
