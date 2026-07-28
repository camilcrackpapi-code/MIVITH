import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Función auxiliar para mostrar errores
function mostrarError(idElemento, texto) {
  const m = document.getElementById(idElemento);
  if (m) {
    m.textContent = texto;
    m.classList.remove("oculto");
  }
}

// LÓGICA DE INICIO DE SESIÓN
const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value.trim();
    const pass = document.getElementById("passLogin").value;
    const mensajeEl = document.getElementById("mensajeLogin");
    
    mensajeEl.classList.add("oculto");

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      window.location.href = "admin.html"; // Asegúrate que admin.html esté en la misma carpeta que acceso.html
    } catch (error) {
      mostrarError("mensajeLogin", "Correo o contraseña incorrectos.");
      console.error("Error Login:", error.code);
    }
  });
}

// LÓGICA DE REGISTRO
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
