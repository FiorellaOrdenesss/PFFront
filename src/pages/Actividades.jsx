import { useEffect, useState } from "react";
import api from "../api";
import "./pages.css";
import UserBanner from "../components/UserBanner";

function Actividades() {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    async function fetchActividades() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/actividades", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActividades(res.data);
      } catch (err) {
        console.error("Error al obtener actividades:", err);
      }
    }
    fetchActividades();
  }, []);

  return (
    <div className="page-container">
      <UserBanner />
      <h2>Actividades</h2>
      <ul>
        {actividades.map((a) => (
          <li key={a.id}>
            <strong>{a.nombre}</strong> — {a.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Actividades;
