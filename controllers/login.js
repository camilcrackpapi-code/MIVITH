import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Función para mostrar errores en el párrafo correspondiente
function mostrarError(idElemento, texto) {
  const m = document.getElementById(idElemento);
  if (m) {
    m.textContent = texto;
    m.classList.remove("oculto");
  }
}

// 1. LÓGICA DE INICIO DE SESIÓN
const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value.trim();
    const pass = document.getElementById("passLogin").value;
    const mensajeEl = document.getElementById("mensajeLogin");
    
    mensajeEl.classList.add("oculto"); // Ocultar error previo

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      // Redirigir al admin (si está en la misma carpeta que acceso.html)
      window.location.href = "admin.html"; 
    } catch (error) {
      mostrarError("mensajeLogin", "Correo o contraseña incorrectos.");
      console.error("Error Login:", error.code);
    }
  });
}

// 2. LÓGICA DE REGISTRO
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
  formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailReg").value.trim();
    const pass = document.getElementById("passReg").value;
    const mensajeEl = document.getElementById("mensajeReg");
    
    mensajeEl.classList.add("oculto");

    if (pass.length < 6) {
      mostrarError("mensajeReg", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      alert("¡Cuenta creada exitosamente!");
      window.location.href = "admin.html";
    } catch (error) {
      mostrarError("mensajeReg", "Error: " + error.code);
      console.error("Error Registro:", error.code);
    }
  });
}
