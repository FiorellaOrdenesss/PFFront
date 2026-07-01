import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaEnvelope,
  FaHome,
  FaGift,
  FaCalendarAlt,
  FaBookOpen,
  FaUser,
  FaCog,
  FaShoppingBag,
} from "react-icons/fa";
import "./Footer.css";
import logo from "../assets/logo-inclusivo.png"; // Cambia la ruta si corresponde

function Footer() {
  const links = [
    { to: "/home", label: "Inicio", icon: <FaHome /> },
    { to: "/productos", label: "Productos", icon: <FaShoppingBag /> },
    { to: "/beneficios", label: "Beneficios", icon: <FaGift /> },
    { to: "/actividades", label: "Actividades", icon: <FaCalendarAlt /> },
    { to: "/recursos", label: "Recursos", icon: <FaBookOpen /> },
    { to: "/perfil", label: "Perfil", icon: <FaUser /> },
    { to: "/configuracion", label: "Configuración", icon: <FaCog /> },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-content">

        <div className="footer-section footer-brand">
          <img src={logo} alt="Inclusivo+" className="footer-logo" />

          <h3>Inclusivo+</h3>

          <p>
            Promoviendo la inclusión, la autonomía y la accesibilidad para
            todas las personas.
          </p>
        </div>

        <div className="footer-section">
          <h4>Navegación</h4>

          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>

          <ul>
            <li>
              <a
                href="https://www.instagram.com/inlusivoplus/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
                <span>@inclusivoplus</span>
              </a>
            </li>

            <li>
              <a href="mailto:inclusivoplus@gmail.com">
                <FaEnvelope />
                <span>inclusivoplus@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Nuestro compromiso</h4>

          <p>
            Trabajamos para ofrecer información, productos y recursos
            accesibles que mejoren la calidad de vida y fomenten una sociedad
            más inclusiva.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Inclusivo+ | Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
