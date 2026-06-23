// src/pages/Configuracion.jsx
import "./pages.css";
import { useNavigate } from "react-router-dom";

function Configuracion() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
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
      </div>
    </div>
  );
}

export default Configuracion;
