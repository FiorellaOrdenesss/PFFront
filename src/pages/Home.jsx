import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  getBeneficios,
  createBeneficio,
  updateBeneficio,
  deleteBeneficio,
} from "../services/beneficios";
import {
  getActividades,
  createActividad,
  updateActividad,
  deleteActividad,
} from "../services/actividades";

import { NavLink } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo-inclusivo.png";

function Home() {
  const [beneficios, setBeneficios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const [selectedBeneficio, setSelectedBeneficio] = useState(null);
  const [selectedActividad, setSelectedActividad] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsuario(decoded);

      getBeneficios(token)
        .then((data) => setBeneficios(data))
        .catch((err) => console.error("Error al traer beneficios:", err));

      getActividades(token)
        .then((data) => setActividades(data))
        .catch((err) => console.error("Error al traer actividades:", err));
    }
  }, []);

  // Handlers Beneficios
  const handleAddBeneficio = async () => {
    const token = localStorage.getItem("token");
    const nuevo = {
      titulo: prompt("Título del beneficio:"),
      descripcion: prompt("Descripción:"),
      disponibilidad: true,
    };
    const res = await createBeneficio(nuevo, token);
    setBeneficios([...beneficios, res]);
  };

  const handleUpdateBeneficio = async (id) => {
    const token = localStorage.getItem("token");
    const actualizado = { titulo: prompt("Nuevo título:") };
    const res = await updateBeneficio(id, actualizado, token);
    setBeneficios(beneficios.map((b) => (b.id === id ? res : b)));
  };

  const handleDeleteBeneficio = async (id) => {
    const token = localStorage.getItem("token");
    await deleteBeneficio(id, token);
    setBeneficios(beneficios.filter((b) => b.id !== id));
  };

  // Handlers Actividades
  const handleAddActividad = async () => {
    const token = localStorage.getItem("token");
    const nueva = {
      nombre: prompt("Nombre de la actividad:"),
      descripcion: prompt("Descripción:"),
      fecha: new Date(),
      ubicacion: "Montevideo",
    };
    const res = await createActividad(nueva, token);
    setActividades([...actividades, res]);
  };

  const handleUpdateActividad = async (id) => {
    const token = localStorage.getItem("token");
    const actualizado = { nombre: prompt("Nuevo nombre:") };
    const res = await updateActividad(id, actualizado, token);
    setActividades(actividades.map((a) => (a.id === id ? res : a)));
  };

  const handleDeleteActividad = async (id) => {
    const token = localStorage.getItem("token");
    await deleteActividad(id, token);
    setActividades(actividades.filter((a) => a.id !== id));
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-card">
            <img src={logo} alt="Inclusivo+" className="logo-img" />
          </div>
          <p>Inclusión para todos</p>
        </div>

        {/* MENÚ */}
        <nav className="menu">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            🏠 Inicio
          </NavLink>
          <NavLink
            to="/beneficios"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ❤️ Beneficios
          </NavLink>
          <NavLink
            to="/actividades"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            📅 Actividades
          </NavLink>
          <NavLink
            to="/recursos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            📁 Recursos
          </NavLink>
          <NavLink
            to="/turnos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ⏰ Turnos
          </NavLink>
          <NavLink
            to="/materiales-adaptados"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            📚 Materiales adaptados
          </NavLink>
          <NavLink
            to="/mensajes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ✉️ Mensajes
          </NavLink>
          <NavLink
            to="/perfil"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            👤 Mi Perfil
          </NavLink>
          <NavLink
            to="/configuracion"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ⚙️ Configuración
          </NavLink>
        </nav>

        {/* ACCESIBILIDAD */}
        <div className="accesibilidad">
          <h3>Opciones de accesibilidad</h3>
          <div className="texto">
            <button>A-</button>
            <button>A</button>
            <button className="selected">A+</button>
          </div>
          <label>
            <input type="checkbox" /> Alto contraste
          </label>
          <label>
            <input type="checkbox" /> Lectura en voz alta
          </label>
          <label>
            <input type="checkbox" /> Lenguaje claro
          </label>
          <button className="more">Más opciones →</button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="contenido">
        <div className="header">
          <div>
            <h1>¡Hola, {usuario?.nombre}! 👋</h1>
            <p>¿Qué quieres hacer hoy?</p>
          </div>
          <button className="accesible-btn">♿ Modo accesible</button>
        </div>

        {/* TARJETAS */}
        <div className="cards">
          <div className="card">
            <h2>{beneficios.filter((b) => b.disponibilidad).length}</h2>
            <p>Beneficios activos</p>
          </div>
          <div className="card">
            <h2>{actividades.length}</h2>
            <p>Actividades próximas</p>
          </div>
          <div className="card">
            <h2>...</h2>
            <p>Recursos disponibles</p>
          </div>
          <div className="card">
            <h2>...</h2>
            <p>Turnos pendientes</p>
          </div>
        </div>

        {/* BENEFICIOS */}
        <div className="section">
          <h2>Beneficios destacados</h2>
          <button onClick={handleAddBeneficio}>➕ Agregar beneficio</button>
          {beneficios.length === 0 ? (
            <p>No hay beneficios disponibles</p>
          ) : (
            beneficios.map((b) => (
              <div key={b.id} className="beneficio">
                <span>{b.titulo}</span>
                <span className="estado">
                  {b.disponibilidad ? "Activo" : "Inactivo"}
                </span>
                <div>
                  <button onClick={() => handleUpdateBeneficio(b.id)}>
                    ✏️ Editar
                  </button>
                  <button onClick={() => handleDeleteBeneficio(b.id)}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ACTIVIDADES */}
        <div className="section">
          <h2>Actividades</h2>
          <button onClick={handleAddActividad}>➕ Agregar actividad</button>
          {actividades.length === 0 ? (
            <p>No hay actividades disponibles</p>
          ) : (
            actividades.map((a) => (
              <div key={a.id} className="actividad">
                <div className="actividad-info">
                  <span>{a.nombre}</span>
                </div>
                <div className="actividad-actions ">
                  <button onClick={() => handleUpdateActividad(a.id)}>
                    ✏️ Editar
                  </button>
                  <button onClick={() => handleDeleteActividad(a.id)}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
