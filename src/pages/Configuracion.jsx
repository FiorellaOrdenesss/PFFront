import "./pages.css";

function Configuracion() {
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="page-container">
      <h2>Configuración</h2>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
}

export default Configuracion;
