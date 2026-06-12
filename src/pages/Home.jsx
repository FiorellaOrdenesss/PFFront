import "./Home.css";
import logo from "../assets/logo-inclusivo.png";

function Home() {
  return (
    <div className="home-container">

   
      <aside className="sidebar">

     
        <div className="logo">

          <div className="logo-card">
            <img
              src={logo}
              alt="Inclusivo+"
              className="logo-img"
            />
          </div>

          <p>Inclusión para todos</p>

        </div>

        {/* MENÚ */}
        <nav className="menu">

          <button className="active">
            🏠 Inicio
          </button>

          <button>
            ❤️ Beneficios
          </button>

          <button>
            📅 Actividades
          </button>

          <button>
            📁 Recursos
          </button>

          <button>
            ⏰ Turnos
          </button>

          <button>
            📚 Materiales adaptados
          </button>

          <button>
            ✉️ Mensajes
          </button>

          <button>
            👤 Mi Perfil
          </button>

          <button>
            ⚙️ Configuración
          </button>

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
            <input type="checkbox" />
            Alto contraste
          </label>

          <label>
            <input type="checkbox" />
            Lectura en voz alta
          </label>

          <label>
            <input type="checkbox" />
            Lenguaje claro
          </label>

          <button className="more">
            Más opciones →
          </button>

        </div>

      </aside>

      {/* CONTENIDO */}
      <main className="contenido">

        <div className="header">

          <div>
            <h1>¡Hola, María! 👋</h1>
            <p>¿Qué quieres hacer hoy?</p>
          </div>

          <button className="accesible-btn">
            ♿ Modo accesible
          </button>

        </div>

        {/* TARJETAS */}
        <div className="cards">

          <div className="card">
            <h2>12</h2>
            <p>Beneficios activos</p>
          </div>

          <div className="card">
            <h2>5</h2>
            <p>Actividades próximas</p>
          </div>

          <div className="card">
            <h2>8</h2>
            <p>Recursos disponibles</p>
          </div>

          <div className="card">
            <h2>2</h2>
            <p>Turnos pendientes</p>
          </div>

        </div>

        {/* BENEFICIOS */}
        <div className="section">

          <h2>Beneficios destacados</h2>

          <div className="beneficio">
            <span>💜 Pensión por discapacidad</span>
            <span className="estado">Activo</span>
          </div>

          <div className="beneficio">
            <span>🚌 Transporte accesible</span>
            <span className="estado">Activo</span>
          </div>

          <div className="beneficio">
            <span>🎓 Inclusión laboral</span>
            <span className="estado">Activo</span>
          </div>

          <div className="beneficio">
            <span>🏥 Cobertura de salud</span>
            <span className="estado">Activo</span>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;