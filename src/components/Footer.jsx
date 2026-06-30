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
          <h3>Inclusivo+</h3>
          <p>
            Plataforma accesible que acompaña la inclusión, la autonomía y la
            participación activa de cada persona.
          </p>
        </div>

        <div className="footer-section">
          <h4>Explora</h4>
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
                href="https://www.instagram.com/inlusivoplus"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a href="mailto:Inclusivoplus@gmail.com">
                <FaEnvelope />
                <span>Gmail</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Sobre nosotros</h4>
          <p>
            Inclusivo+ nace para acercar recursos, actividades y beneficios a
            personas que buscan una experiencia más cómoda, útil y acompañada.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
