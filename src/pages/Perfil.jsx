import { useEffect, useState } from "react";
import api from "../api";
import "./pages.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data[0]);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      }
    }
    fetchPerfil();
  }, []);

  return (
    <div className="page-container">
      <h2>Mi perfil</h2>
      {usuario ? (
        <ul>
          <li>
            <strong>Nombre:</strong> {usuario.nombre}
          </li>
          <li>
            <strong>Email:</strong> {usuario.email}
          </li>
          <li>
            <strong>Rol:</strong> {usuario.rol}
          </li>
        </ul>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}

export default Perfil;
