import { useEffect, useState } from "react";
import api from "../api";
import "./pages.css";
import UserBanner from "../components/UserBanner";
import { FaHeart, FaCheckCircle } from "react-icons/fa";

function Beneficios() {
  const [beneficios, setBeneficios] = useState([]);

  useEffect(() => {
    async function fetchBeneficios() {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/beneficios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

      <UserBanner />

      <div className="page-header">

        <span className="page-badge">
          Inclusivo+
        </span>

        <h1>
          Beneficios Disponibles
        </h1>

        <p>
          Descubre todos los beneficios disponibles para personas con discapacidad,
          pensados para mejorar la calidad de vida, promover la inclusión y facilitar
          el acceso a distintos servicios.
        </p>

      </div>

      {beneficios.length === 0 ? (

        <div className="empty-card">

          <FaHeart className="empty-icon" />

          <h3>No hay beneficios disponibles</h3>

          <p>
            Cuando existan beneficios aparecerán aquí.
          </p>

        </div>

      ) : (

        <div className="beneficios-grid">

          {beneficios.map((b) => (

            <div
              key={b.id}
              className="beneficio-card"
            >

              <div className="beneficio-icon">

                <FaHeart />

              </div>

              <div className="beneficio-content">

                <span className="beneficio-status">

                  <FaCheckCircle />

                  Disponible

                </span>

                <h3>

                  {b.titulo}

                </h3>

                <p>

                  {b.descripcion}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Beneficios;
