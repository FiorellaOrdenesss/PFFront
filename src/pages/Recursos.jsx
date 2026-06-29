import "./pages.css";
import UserBanner from "../components/UserBanner";

import {
  FaBookOpen,
  FaFilePdf,
  FaVideo,
  FaGlobe,
} from "react-icons/fa";

function Recursos() {
  return (
    <div className="page-container">

      <UserBanner />

      <div className="page-header">

        <span className="page-badge">
          Inclusivo+
        </span>

        <h1>
          Recursos Accesibles
        </h1>

        <p>
          Aquí encontrarás materiales educativos, guías,
          documentos, videos y enlaces útiles para favorecer
          la inclusión y la accesibilidad.
        </p>

      </div>

      <div className="beneficios-grid">

        <div className="beneficio-card">

          <div className="beneficio-icon">

            <FaBookOpen />

          </div>

          <div className="beneficio-content">

            <span className="beneficio-status">
              Disponible
            </span>

            <h3>
              Guías de Accesibilidad
            </h3>

            <p>
              Manuales y documentos sobre accesibilidad,
              inclusión y derechos de las personas con discapacidad.
            </p>

          </div>

        </div>

        <div className="beneficio-card">

          <div className="beneficio-icon">

            <FaFilePdf />

          </div>

          <div className="beneficio-content">

            <span className="beneficio-status">
              Disponible
            </span>

            <h3>
              Documentos PDF
            </h3>

            <p>
              Información útil para estudiantes,
              familias y profesionales.
            </p>

          </div>

        </div>

        <div className="beneficio-card">

          <div className="beneficio-icon">

            <FaVideo />

          </div>

          <div className="beneficio-content">

            <span className="beneficio-status">
              Disponible
            </span>

            <h3>
              Videos Educativos
            </h3>

            <p>
              Material audiovisual accesible para facilitar
              el aprendizaje y la capacitación.
            </p>

          </div>

        </div>

        <div className="beneficio-card">

          <div className="beneficio-icon">

            <FaGlobe />

          </div>

          <div className="beneficio-content">

            <span className="beneficio-status">
              Disponible
            </span>

            <h3>
              Enlaces de Interés
            </h3>

            <p>
              Accede a organismos, instituciones y recursos
              nacionales e internacionales relacionados con la discapacidad.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Recursos;