import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, // Importamos la función para registrar
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const obtener = (id) => document.getElementById(id);

// Diccionario de errores ampliado para incluir errores de registro
const ERRORES = {
  "auth/invalid-email":          "El correo no tiene un formato válido.",
  "auth/missing-password":       "Escribe la contraseña.",
  "auth/invalid-credential":     "Correo o contraseña incorrectos.",
  "auth/too-many-requests":      "Demasiados intentos. Espera un momento.",
  "auth/network-request-failed": "Sin conexión a internet.",
  "auth/operation-not-allowed":  "Habilita Correo/contraseña en la consola de Firebase.",
  "auth/email-already-in-use":   "Este correo ya está registrado.",
  "auth/weak-password":          "La contraseña es muy débil (mínimo 6 caracteres)."
};

function mostrarError(texto) {
  const m = obtener("mensaje");
  if (m) {
    m.textContent = texto;
    m.className = "mensaje error";
  }
}

// EVENTO 1: INICIAR SESIÓN (Botón "Entrar")
const formLogin = obtener("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();                 
    const mensajeEl = obtener("mensaje");
    if (mensajeEl) mensajeEl.className = "mensaje oculto";

    const correo = obtener("email").value.trim();
    const clave  = obtener("password").value;

    const boton = obtener("btnEntrar");
    boton.disabled = true;
    boton.textContent = "Verificando…";

    try {
      await signInWithEmailAndPassword(auth, correo, clave);
      window.location.href = "templates/admin.html";
    } catch (error) {
      mostrarError(ERRORES[error.code] || "Error: " + error.code);
      console.error("Error Login:", error.code, error.message);
      boton.disabled = false;
      boton.textContent = "Entrar";
    }
  });
}

// ---------------------------------------------
// EVENTO 2: CREAR CUENTA (Botón "Crear Cuenta")
// ---------------------------------------------
const btnRegistrar = obtener("btnRegistrar");
if (btnRegistrar) {
  btnRegistrar.addEventListener("click", async () => {
    const mensajeEl = obtener("mensaje");
    if (mensajeEl) mensajeEl.className = "mensaje oculto";

    const correo = obtener("email").value.trim();
    const clave  = obtener("password").value;

    // Validaciones básicas antes de intentar registrar
    if (!correo || !clave) {
        mostrarError("Escribe un correo y una contraseña para registrarte.");
        return;
    }
    if (clave.length < 6) {
        mostrarError("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    btnRegistrar.disabled = true;
    btnRegistrar.textContent = "Creando...";

    try {
      // Intentamos crear el usuario en Firebase
      await createUserWithEmailAndPassword(auth, correo, clave);
      alert("✅ Cuenta creada exitosamente. ¡Bienvenido!");
      // Firebase inicia sesión automáticamente al crear la cuenta, redirigimos al admin
      window.location.href = "templates/admin.html";
    } catch (error) {
      mostrarError(ERRORES[error.code] || "Error: " + error.code);
      console.error("Error Registro:", error.code, error.message);
      btnRegistrar.disabled = false;
      btnRegistrar.textContent = "Crear Cuenta";
    }
  });
}

// EVENTO 3: CERRAR SESIÓN

const btnSalir = obtener("btnSalir");
if (btnSalir) {
  btnSalir.addEventListener("click", () => signOut(auth));
}


// MONITOR DE ESTADO EN TIEMPO REAL
onAuthStateChanged(auth, (usuario) => {
  const panelLogin = obtener("panelLogin");
  const panelSesion = obtener("panelSesion");
  const usuarioActivo = obtener("usuarioActivo");

  if (usuario) {
    if (panelLogin) panelLogin.classList.add("oculto");
    if (panelSesion) panelSesion.classList.remove("oculto");
    if (usuarioActivo) usuarioActivo.textContent = "Conectado como: " + usuario.email;
  } else {
    if (panelSesion) panelSesion.classList.add("oculto");
    if (panelLogin) panelLogin.classList.remove("oculto");
  }
});