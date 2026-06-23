import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          Inclusivo
        </Link>
      </div>


      <div className="navbar-links">

        <Link to="/">
          Inicio
        </Link>

        <Link to="/perfil">
          Mi Perfil
        </Link>

        <Link to="/oportunidades">
          Oportunidades
        </Link>

        <Link to="/ayuda">
          Ayuda
        </Link>

      </div>


      <button className="navbar-btn">
        Cerrar sesión
      </button>

    </nav>
  );
}

export default Navbar;