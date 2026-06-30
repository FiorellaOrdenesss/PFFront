// src/pages/Configuracion.jsx
import "./pages.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUsuario } from "../services/usuarios";
import ModalMessage from "../components/ModalMessage";

function Configuracion() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    window.location.href = "/login";
  };

  const irAdministrador = () => {
    navigate("/administrador");
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Configuración</h2>
      <div className="d-flex flex-column gap-3">
        <button className="btn btn-secondary" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
        <button className="btn btn-primary" onClick={irAdministrador}>
          Administrador
        </button>
        {/* Admin registration moved to Register page */}
        <ModalMessage
          title="Configuración"
          message={message}
          onClose={() => setMessage("")}
        />
      </div>
    </div>
  );
}

export default Configuracion;
