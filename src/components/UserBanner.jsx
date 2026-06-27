import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UserBanner.css";
import bannerImage from "../assets/imagenBanner.jpg";

function UserBanner() {
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize")) || 16,
  );
  const [altoContraste, setAltoContraste] = useState(
    localStorage.getItem("altoContraste") === "true",
  );
  const [lecturaActiva, setLecturaActiva] = useState(
    localStorage.getItem("lecturaActiva") === "true",
  );

  useEffect(() => {
    const syncSettings = () => {
      setFontSize(Number(localStorage.getItem("fontSize")) || 16);
      setAltoContraste(localStorage.getItem("altoContraste") === "true");
      setLecturaActiva(localStorage.getItem("lecturaActiva") === "true");
    };

    window.addEventListener("storage", syncSettings);
    return () => window.removeEventListener("storage", syncSettings);
  }, []);

  useEffect(() => {
    if (!lecturaActiva) return;

    const banner = document.querySelector(".user-banner-card");
    if (!banner) return;

    const items = banner.querySelectorAll(
      ".user-banner-copy *, .user-banner-cta",
    );
    const handlers = [];

    items.forEach((item) => {
      const handleMouseEnter = () => {
        const texto = item.innerText;
        if (!texto) return;

        const speech = new SpeechSynthesisUtterance(texto);
        speech.lang = "es-ES";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
      };

      item.addEventListener("mouseenter", handleMouseEnter);
      handlers.push({ item, handleMouseEnter });
    });

    return () => {
      handlers.forEach(({ item, handleMouseEnter }) => {
        item.removeEventListener("mouseenter", handleMouseEnter);
      });
    };
  }, [lecturaActiva]);

  return (
    <section
      className={`user-banner ${altoContraste ? "alto-contraste" : ""} ${
        lecturaActiva ? "lectura-activa" : ""
      }`}
      style={{ fontSize: `${fontSize}px` }}
      aria-label="Banner de productos inclusivos"
    >
      <div className="user-banner-card">
        <div className="user-banner-copy">
          <span className="user-banner-tag">Productos inclusivos</span>
          <h2 className="user-banner-title">
            Soluciones accesibles para personas con discapacidad
          </h2>
          <p className="user-banner-text">
            Descubrí productos pensados para la autonomía, la movilidad y el
            bienestar diario.
          </p>
          <Link className="user-banner-cta" to="/productos">
            Ver productos
          </Link>
        </div>

        <div className="user-banner-media">
          <img
            src={bannerImage}
            alt="Productos inclusivos para personas con discapacidad"
          />
        </div>
      </div>
    </section>
  );
}

export default UserBanner;
