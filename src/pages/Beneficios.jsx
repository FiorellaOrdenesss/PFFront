import { useEffect, useState } from "react";
import api from "../api";
import "./pages.css";

function Beneficios() {
  const [beneficios, setBeneficios] = useState([]);

  useEffect(() => {
    async function fetchBeneficios() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/beneficios", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBeneficios(res.data);
      } catch (err) {
        console.error("Error al obtener beneficios:", err);
      }
    }
    fetchBeneficios();
  }, []);

  return (
    <div className="page-container">
      <h2>Beneficios disponibles</h2>
      <ul>
        {beneficios.map((b) => (
          <li key={b.id}>
            <strong>{b.titulo}</strong> — {b.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Beneficios;
