import "./pages.css";
import UserBanner from "../components/UserBanner";

const turnos = [
  {
    id: 1,
    titulo: "Consulta Médica",
    fecha: "10/07/2026 - 09:00",
    estado: "Pendiente",
  },
  {
    id: 2,
    titulo: "Evaluación Psicológica",
    fecha: "15/07/2026 - 14:30",
    estado: "Pendiente",
  },
  {
    id: 3,
    titulo: "Fisioterapia",
    fecha: "20/07/2026 - 11:00",
    estado: "Pendiente",
  },
];

function Turnos() {
  return (
    <div className="page-container">
      <UserBanner />

      <div className="page-header">
        <span className="page-badge">Inclusivo+</span>

        <h1>Turnos</h1>

        <p>
          Consulta tus próximas citas y mantén un seguimiento de tus turnos.
        </p>
      </div>

      <div className="beneficios-grid">
        {turnos.map((turno) => (
          <div className="beneficio-card" key={turno.id}>
            <div className="beneficio-content">

              <span className="beneficio-status">
                {turno.estado}
              </span>

              <h3>{turno.titulo}</h3>

              <p>{turno.fecha}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Turnos;