import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../pages/pages.css";
import "./NavbarPrincipal.css";
import logo from "../assets/logo-inclusivo.png";

function NavbarPrincipal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [reading, setReading] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    // load settings
    const ac = localStorage.getItem("ac_contrast") === "true";
    const fs = parseInt(localStorage.getItem("ac_fontSize") || "16", 10);
    setAltoContraste(ac);
    setFontSize(fs);
    applyContrast(ac);
    applyFontSize(fs);
  }, []);

  function applyContrast(enabled) {
    if (enabled) document.body.classList.add("alto-contraste");
    else document.body.classList.remove("alto-contraste");
    localStorage.setItem("ac_contrast", enabled ? "true" : "false");
  }

  function applyFontSize(size) {
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem("ac_fontSize", String(size));
  }

  function toggleReading() {
    if (reading) {
      synthRef.current.cancel();
      setReading(false);
      return;
    }

    const main = document.querySelector("main") || document.body;
    const text = (main.innerText || main.textContent || "").trim();
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.onend = () => setReading(false);
    synthRef.current.speak(utter);
    setReading(true);
  }

  // close when clicking outside
  useEffect(() => {
    function onDoc(e) {
      if (!e.target.closest) return;
      const inside =
        e.target.closest(".ac-dropdown") || e.target.closest(".ac-toggle-btn");
      if (!inside) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <nav className="navbar-principal">
      <div className="nav-brand" onClick={() => navigate("/home")}>
        <img src={logo} alt="Inclusivo+" className="nav-logo-img" />
      </div>

      <div className="nav-links">
        <NavLink
          to="/beneficios"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Beneficios
        </NavLink>
        <NavLink
          to="/actividades"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Actividades
        </NavLink>

        <NavLink
          to="/recursos"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Recursos
        </NavLink>
        <NavLink
          to="/turnos"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Turnos
        </NavLink>
        <NavLink
          to="/mensajes"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Mensajes
        </NavLink>
      </div>

      <div className="nav-actions">
        <NavLink to="/perfil" className="nav-link">
          Mi perfil
        </NavLink>
        <NavLink to="/configuracion" className="nav-link">
          Configuración
        </NavLink>

        <div className="ac-wrapper">
          <button
            className="ac-toggle-btn"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            Accesibilidad ▾
          </button>

          {open && (
            <div className="ac-dropdown" role="menu">
              <div className="ac-section">
                <label className="ac-label">Alto contraste</label>
                <div className="accesibilidad-toggle">
                  <button
                    className={
                      altoContraste ? "toggle-btn activo" : "toggle-btn"
                    }
                    onClick={() => {
                      setAltoContraste(!altoContraste);
                      applyContrast(!altoContraste);
                    }}
                  >
                    <span>{altoContraste ? "Activado" : "Alto contraste"}</span>
                  </button>
                </div>
              </div>

              <div className="ac-section">
                <label className="ac-label">Tamaño de lectura</label>
                <div className="texto">
                  <button
                    className={fontSize === 14 ? "selected" : ""}
                    onClick={() => {
                      setFontSize(14);
                      applyFontSize(14);
                    }}
                  >
                    A-
                  </button>
                  <button
                    className={fontSize === 16 ? "selected" : ""}
                    onClick={() => {
                      setFontSize(16);
                      applyFontSize(16);
                    }}
                  >
                    A
                  </button>
                  <button
                    className={fontSize === 20 ? "selected" : ""}
                    onClick={() => {
                      setFontSize(20);
                      applyFontSize(20);
                    }}
                  >
                    A+
                  </button>
                </div>
              </div>

              <div className="ac-section">
                <label className="ac-label">Lectura en voz alta</label>
                <div className="accesibilidad-toggle">
                  <button
                    className={reading ? "toggle-btn activo" : "toggle-btn"}
                    onClick={() => {
                      toggleReading();
                    }}
                  >
                    <span>{reading ? "Detener lector" : "Activar lector"}</span>
                  </button>
                </div>
              </div>

              {/* Links removed from accessibility menu - kept in main navbar */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarPrincipal;
