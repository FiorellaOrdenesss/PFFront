import { useEffect, useState } from "react";
import api from "../api";
import "./pages.css";
import UserBanner from "../components/UserBanner";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaLaptop,
  FaArrowRight,
} from "react-icons/fa";

function Actividades() {

  const [actividades, setActividades] = useState([]);

  useEffect(() => {

    async function fetchActividades() {

      try {

        const token = localStorage.getItem("token");

        const res = await api.get("/actividades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setActividades(res.data);

      } catch (err) {

        console.error(err);

      }

    }

    fetchActividades();

  }, []);

  return (

<div className="page-container">

    <UserBanner />

    <div className="page-header">

        <span className="page-badge">

            Inclusivo+

        </span>

        <h1>

            Actividades Inclusivas en Uruguay

        </h1>

        <p>

            Descubre actividades deportivas, culturales,
            educativas y recreativas diseñadas para promover
            la inclusión, la participación y el bienestar de
            las personas con discapacidad en todo el país.

        </p>

    </div>

    <div
        style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
            gap:"20px",
            marginBottom:"35px"
        }}
    >

        <div className="stat-card">

            <h3>

                12

            </h3>

            <p>

                Actividades

            </p>

        </div>

        <div className="stat-card">

            <h3>

                19

            </h3>

            <p>

                Departamentos

            </p>

        </div>

        <div className="stat-card">

            <h3>

                100%

            </h3>

            <p>

                Inclusivas

            </p>

        </div>

        <div className="stat-card">

            <h3>

                Gratis

            </h3>

            <p>

                Muchas propuestas

            </p>

        </div>

    </div>

    {actividades.length===0 ? (

        <div className="empty-card">

          <FaCalendarAlt className="empty-icon" />

          <h3>
            No hay actividades disponibles
          </h3>

          <p>
            Cuando existan actividades aparecerán aquí.
          </p>

        </div>

      ) : (

        <div className="beneficios-grid">

    {actividades.map((a) => (

        <div
            key={a.id}
            className="beneficio-card"
        >

            <img
    src={`/actividades/${a.imagen}`}
    alt={a.nombre}
    className="actividad-img"
/>

            <div className="beneficio-content">

                <span className="beneficio-status">

                    <FaCheckCircle />

                    Disponible

                </span>

                <h3>

                    {a.nombre}

                </h3>

                <p>

                    {a.descripcion}

                </p>

                <div className="actividad-detalle">

    <FaMapMarkerAlt />

    <span>

        {a.ubicacion}

    </span>

</div>

                <div className="actividad-detalle">

    <FaClock />

    <span>

        {new Date(a.fecha).toLocaleDateString("es-UY")}

    </span>

</div>

                <div className="actividad-detalle">

                    <FaUsers />

                    <span>

                        20 cupos disponibles

                    </span>

                </div>

                <div className="actividad-detalle">

                    <FaLaptop />

                    <span>

                        Presencial y Virtual

                    </span>

                </div>

                <a
    href={a.link}
    target="_blank"
    rel="noopener noreferrer"
    className="actividad-btn"
>

    Inscribirme

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

export default Actividades;