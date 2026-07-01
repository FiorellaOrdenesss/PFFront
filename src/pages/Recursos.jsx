import "./pages.css";
import UserBanner from "../components/UserBanner";

const recursos = [
  {
    titulo: "Guías de Accesibilidad",
    descripcion:
      "Manuales y documentos sobre accesibilidad, inclusión y derechos de las personas con discapacidad.",
    imagen: "/recursos/guias_accesibilidad.png",
    link: "https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento",
  },
  {
    titulo: "Documentos PDF",
    descripcion:
      "Información útil para estudiantes, familias y profesionales.",
    imagen: "/recursos/documentos_pdf.png",
    link: "https://www.bps.gub.uy",
  },
  {
    titulo: "Videos Educativos",
    descripcion:
      "Material audiovisual accesible para facilitar el aprendizaje y la capacitación.",
    imagen: "/recursos/videos_educativos.png",
    link: "https://www.youtube.com/@MidesUruguay",
  },
  {
    titulo: "Enlaces de Interés",
    descripcion:
      "Accede a organismos, instituciones y recursos nacionales e internacionales relacionados con la discapacidad.",
    imagen: "/recursos/enlaces_interes.png",
    link: "https://www.impo.com.uy",
  },
];

function Recursos() {
  return (
    <div className="page-container">
      <UserBanner />

      <div className="page-header">
        <span className="page-badge">Inclusivo+</span>

        <h1>Recursos Accesibles</h1>

        <p>
          Aquí encontrarás materiales educativos, guías,
          documentos, videos y enlaces útiles para favorecer
          la inclusión y la accesibilidad.
        </p>
      </div>

      <div className="beneficios-grid">
        {recursos.map((recurso, index) => (
          <div className="beneficio-card" key={index}>

            <img
              src={recurso.imagen}
              alt={recurso.titulo}
              className="beneficio-imagen"
            />

            <div className="beneficio-content">

              <span className="beneficio-status">
                Disponible
              </span>

              <h3>{recurso.titulo}</h3>

              <p>{recurso.descripcion}</p>

              <a
                href={recurso.link}
                target="_blank"
                rel="noopener noreferrer"
                className="beneficio-btn"
              >
                Ver recurso →
              </a>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Recursos;