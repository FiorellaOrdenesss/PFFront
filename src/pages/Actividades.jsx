import { useEffect, useState } from "react";
import api from "../api";
import {
  getActividades,
  createActividadWithImage,
} from "../services/actividades";
import "./pages.css";
import UserBanner from "../components/UserBanner";
import logo from "../assets/logo-inclusivo.png";
import ModalMessage from "../components/ModalMessage";

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
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    ubicacion: "",
  });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [message, setMessage] = useState("");

  const getImageUrl = (imagen) => {
    if (!imagen) return logo;
    if (/^https?:\/\//i.test(imagen)) return imagen;
    if (imagen.startsWith("/")) return imagen; // public path
    const base = api?.defaults?.baseURL || "";
    const host = base.replace(/\/api\/?$/i, "") || window.location.origin;
    return `${host}${imagen.startsWith("/") ? imagen : `/uploads/actividades/${imagen}`}`;
  };

  useEffect(() => {
    async function fetchActividades() {
      try {
        const token = localStorage.getItem("token");
        const res = await getActividades(token);
        setActividades(Array.isArray(res) ? res : res?.data || []);
      } catch (err) {
        console.error("Error al obtener actividades:", err);
      }
    }

    fetchActividades();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const fd = new FormData();
    fd.append("nombre", form.nombre);
    fd.append("descripcion", form.descripcion);
    fd.append("fecha", form.fecha);
    fd.append("ubicacion", form.ubicacion);
    if (file) fd.append("imagen", file);

    try {
      setLoadingUpload(true);
      setUploadProgress(0);
      const nueva = await createActividadWithImage(fd, token, (ev) => {
        if (ev.lengthComputable)
          setUploadProgress(Math.round((ev.loaded * 100) / ev.total));
      });
      setActividades((prev) => [nueva, ...prev]);
      setForm({ nombre: "", descripcion: "", fecha: "", ubicacion: "" });
      setFile(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error al crear actividad:", err);
      setMessage("Error al subir la actividad");
    } finally {
      setLoadingUpload(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="page-container">
      <UserBanner />

      <div className="page-header">
        <span className="page-badge">Inclusivo+</span>

        <h1>Actividades Inclusivas en Uruguay</h1>

        <p>
          Descubre actividades deportivas, culturales, educativas y recreativas
          diseñadas para promover la inclusión, la participación y el bienestar
          de las personas con discapacidad en todo el país.
        </p>
      </div>

      <div style={{ margin: "20px 0" }}>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm((s) => !s)}
        >
          {showForm ? "Cancelar" : "Agregar actividad"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
            <div className="mb-2">
              <input
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <input
                name="ubicacion"
                placeholder="Ubicación"
                value={form.ubicacion}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {loadingUpload && (
              <div className="mb-2">
                <progress value={uploadProgress} max="100">
                  {uploadProgress}%
                </progress>
              </div>
            )}

            <div>
              <ModalMessage
                title="Actividad"
                message={message}
                onClose={() => setMessage("")}
              />
              <button
                className="btn btn-success"
                type="submit"
                disabled={loadingUpload}
              >
                {loadingUpload
                  ? `Subiendo (${uploadProgress}%)`
                  : "Crear actividad"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div className="stat-card">
          <h3>12</h3>

          <p>Actividades</p>
        </div>

        <div className="stat-card">
          <h3>19</h3>

          <p>Departamentos</p>
        </div>

        <div className="stat-card">
          <h3>100%</h3>

          <p>Inclusivas</p>
        </div>

        <div className="stat-card">
          <h3>Gratis</h3>

          <p>Muchas propuestas</p>
        </div>
      </div>

      {actividades.length === 0 ? (
        <div className="empty-card">
          <FaCalendarAlt className="empty-icon" />

          <h3>No hay actividades disponibles</h3>

          <p>Cuando existan actividades aparecerán aquí.</p>
        </div>
      ) : (
        <div className="beneficios-grid">
          {actividades.map((a) => (
            <div key={a.id} className="beneficio-card">
              <img
                src={getImageUrl(a.imagen)}
                alt={a.nombre}
                className="actividad-img"
                loading="lazy"
                onError={(e) => (e.currentTarget.src = logo)}
              />

              <div className="beneficio-content">
                <span className="beneficio-status">
                  <FaCheckCircle />
                  Disponible
                </span>

                <h3>{a.nombre}</h3>

                <p>{a.descripcion}</p>

                <div className="actividad-detalle">
                  <FaMapMarkerAlt />

                  <span>{a.ubicacion}</span>
                </div>

                <div className="actividad-detalle">
                  <FaClock />

                  <span>{new Date(a.fecha).toLocaleDateString("es-UY")}</span>
                </div>

                <div className="actividad-detalle">
                  <FaUsers />

                  <span>20 cupos disponibles</span>
                </div>

                <div className="actividad-detalle">
                  <FaLaptop />

                  <span>Presencial y Virtual</span>
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
