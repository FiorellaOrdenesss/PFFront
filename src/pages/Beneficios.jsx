import { useEffect, useState } from "react";
import api from "../api";
import "./pages.css";
import UserBanner from "../components/UserBanner";
import logo from "../assets/logo-inclusivo.png";

import {
  FaHeart,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

function Beneficios() {
  const [beneficios, setBeneficios] = useState([]);

  const getImageUrl = (imagen) => {
    if (!imagen) return logo;

    if (/^https?:\/\//i.test(imagen)) return imagen;

    return imagen;
  };

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

        <h1>Beneficios Disponibles</h1>

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

          <p>Cuando existan beneficios aparecerán aquí.</p>
        </div>
      ) : (
        <div className="beneficios-grid">
          {beneficios.map((b) => (
            <div
              key={b.id}
              className="beneficio-card"
            >
              <img
                src={getImageUrl(b.imagen)}
                alt={b.titulo}
                className="actividad-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = logo;
                }}
              />

              <div className="beneficio-content">
                <span className="beneficio-status">
                  <FaCheckCircle />
                  Disponible
                </span>

                <h3>{b.titulo}</h3>

                <p>{b.descripcion}</p>

                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="actividad-btn"
                >
                  Ver beneficio
                  <FaArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Beneficios;