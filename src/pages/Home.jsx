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

import {
  FaHome,
  FaHeart,
  FaCalendarAlt,
  FaFolderOpen,
  FaClock,
  FaBook,
  FaComments,
  FaUser,
  FaCog,
} from "react-icons/fa";

import {
  BsEyeFill,
  BsFileTextFill,
  BsVolumeUpFill,
} from "react-icons/bs";

import { NavLink } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo-inclusivo.png";

function Home() {
  const [beneficios, setBeneficios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [fontSize, setFontSize] = useState(
  Number(localStorage.getItem("fontSize")) || 16
);

const [altoContraste, setAltoContraste] = useState(
  localStorage.getItem("altoContraste") === "true"
);

const [lenguajeClaro, setLenguajeClaro] = useState(
  localStorage.getItem("lenguajeClaro") === "true"
);

const [lecturaActiva, setLecturaActiva] = useState(
  localStorage.getItem("lecturaActiva") === "true"
);
  const [modoAccesible, setModoAccesible] = useState(false);


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

  useEffect(() => {
  localStorage.setItem("fontSize", fontSize);
  localStorage.setItem("altoContraste", altoContraste);

  document.documentElement.style.fontSize = `${fontSize}px`;

  if (altoContraste) {
    document.body.classList.add("alto-contraste");
  } else {
    document.body.classList.remove("alto-contraste");
  }
}, [fontSize, altoContraste]);

useEffect(() => {
  localStorage.setItem(
    "lenguajeClaro",
    lenguajeClaro
  );
}, [lenguajeClaro]);

useEffect(() => {
  localStorage.setItem(
    "lecturaActiva",
    lecturaActiva
  );
}, [lecturaActiva]);

useEffect(() => {
  if (!lecturaActiva) {
    document
      .querySelectorAll("button, a, h1, h2, h3, p, span")
      .forEach((element) => {
        element.onmouseenter = null;
      });

    window.speechSynthesis.cancel();
    return;
  }

  document
    .querySelectorAll("button, a, h1, h2, h3, p, span")
    .forEach((element) => {
      element.onmouseenter = () => {
        const texto = element.innerText;

        if (!texto) return;

        const speech = new SpeechSynthesisUtterance(texto);
        speech.lang = "es-ES";

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
      };
    });
}, [lecturaActiva]);




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
  useEffect(() => {
  if (!lecturaActiva) return;

  const elementos = document.querySelectorAll(
    "button, a, h1, h2, h3, p, span"
  );

  elementos.forEach((element) => {
    element.onmouseenter = () => {
      const texto = element.innerText;

      if (!texto) return;

      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = "es-ES";

      window.speechSynthesis.speak(speech);
    };
  });

  return () => {
    elementos.forEach((element) => {
      element.onmouseenter = null;
    });
  };
}, [lecturaActiva]);

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
  <NavLink to="/">
    <FaHome className="menu-icon" />
    <span>Inicio</span>
  </NavLink>

  <NavLink to="/beneficios">
    <FaHeart className="menu-icon" />
    <span>Beneficios</span>
  </NavLink>

  <NavLink to="/actividades">
    <FaCalendarAlt className="menu-icon" />
    <span>Actividades</span>
  </NavLink>

  <NavLink to="/recursos">
    <FaFolderOpen className="menu-icon" />
    <span>Recursos</span>
  </NavLink>

  <NavLink to="/turnos">
    <FaClock className="menu-icon" />
    <span>Turnos</span>
  </NavLink>

  <NavLink to="/materiales-adaptados">
    <FaBook className="menu-icon" />
    <span>Materiales adaptados</span>
  </NavLink>

  <NavLink to="/mensajes">
    <FaComments className="menu-icon" />
    <span>Mensajes</span>
  </NavLink>

  <NavLink to="/perfil">
    <FaUser className="menu-icon" />
    <span>Mi Perfil</span>
  </NavLink>

  <NavLink to="/configuracion">
    <FaCog className="menu-icon" />
    <span>Configuración</span>
  </NavLink>
</nav>

      
{/* ACCESIBILIDAD */}
<div className="accesibilidad">
  <h3>Opciones de accesibilidad</h3>

  <div className="texto">
    <button onClick={() => setFontSize(14)}>A-</button>
    <button onClick={() => setFontSize(16)}>A</button>
    <button
      className="selected"
      onClick={() => setFontSize(20)}
    >
      A+
    </button>
  </div>

 <div className="accesibilidad-toggle">
  <button
    className={altoContraste ? "toggle-btn activo" : "toggle-btn"}
    onClick={() => setAltoContraste(!altoContraste)}
  >
    <BsEyeFill />
    <span>Alto contraste</span>
  </button>

  <button
    className={lenguajeClaro ? "toggle-btn activo" : "toggle-btn"}
    onClick={() => setLenguajeClaro(!lenguajeClaro)}
  >
    <BsFileTextFill />
    <span>Lenguaje claro</span>
  </button>

  <button
    className={lecturaActiva ? "toggle-btn activo" : "toggle-btn"}
    onClick={() => setLecturaActiva(!lecturaActiva)}
  >
    <BsVolumeUpFill />
    <span>
      {lecturaActiva
        ? "Desactivar lector"
        : "Activar lector"}
    </span>
  </button>
</div>
</div>
</aside>

{/* CONTENIDO */}
<main className="contenido">
  <div className="header">
    <div>
      <h1>
        ¡Hola, {usuario?.nombre}! 👋
      </h1>

      <p>
    {lenguajeClaro
    ? "Selecciona una opción del menú para acceder a beneficios, actividades y recursos."
    : "¿Qué quieres hacer hoy?"}
  </p>
    </div>


  </div>
        {/* TARJETAS */}
        <div className="cards">
          <div className="card">
            <h2>{beneficios.filter((b) => b.disponibilidad).length}</h2>
            <p>
                {lenguajeClaro
                 ? "Beneficios disponibles"
                : "Beneficios activos"}
            </p>
          </div>
          <div className="card">
            <h2>{actividades.length}</h2>
           <p>
                  {lenguajeClaro
                ? "Actividades programadas"
                : "Actividades próximas"}
          </p>
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
              <div
                key={b.id}
                className="beneficio clickable"
                onClick={() => setSelectedBeneficio(b)}
              >
                <span>{b.titulo}</span>
              </div>
            ))
          )}
        </div>

        <div className="section">
          <h2>Actividades</h2>
          {actividades.length === 0 ? (
            <p>No hay actividades disponibles</p>
          ) : (
            actividades.map((a) => (
              <div
                key={a.id}
                className="actividad clickable"
                onClick={() => setSelectedActividad(a)}
              >
                <span>{a.nombre}</span>
              </div>
            ))
          )}
        </div>
        <ModalDetalle
          item={selectedBeneficio}
          onClose={() => setSelectedBeneficio(null)}
        />
        <ModalDetalle
          item={selectedActividad}
          onClose={() => setSelectedActividad(null)}
        />
      </main>
    </div>
  );
}

export default Home;
