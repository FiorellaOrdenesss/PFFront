// src/pages/Mensajes.jsx

import "./pages.css";
import UserBanner from "../components/UserBanner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaInstagram,
  FaPhoneAlt,
  FaPaperPlane,
  FaBoxOpen,
  FaGift,
  FaUniversalAccess,
  FaCalendarAlt,
} from "react-icons/fa";

function Mensajes() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const enviarMensaje = (e) => {
    e.preventDefault();

    alert(
      "¡Gracias por comunicarte con Inclusivo+! Tu consulta ha sido enviada."
    );

    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });
  };

  return (
    <div className="mensajes-page">
      <UserBanner />

      <div className="mensajes-container">

        <div className="mensajes-header">
          <h2>💬 Centro de Mensajes</h2>

          <p>
            Estamos para ayudarte. Completa el formulario y nos
            comunicaremos contigo a la brevedad.
          </p>
        </div>

        <div className="mensajes-grid">

          <div className="mensaje-form-card">

            <h3>Enviar consulta</h3>

            <form onSubmit={enviarMensaje}>

              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <select
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un motivo</option>
                <option>Consulta sobre productos</option>
                <option>Beneficios</option>
                <option>Actividades</option>
                <option>Accesibilidad</option>
                <option>Otro</option>
              </select>

              <textarea
                rows="6"
                name="mensaje"
                placeholder="Escribe aquí tu mensaje..."
                value={formData.mensaje}
                onChange={handleChange}
                required
              />

              <button type="submit">
                <FaPaperPlane />
                Enviar mensaje
              </button>

            </form>

          </div>

          <div className="contacto-card">

            <h3>Información de contacto</h3>

            <div className="contacto-item">
              <FaEnvelope />
              <span>inclusivoplus@gmail.com</span>
            </div>

            <div className="contacto-item">
              <FaInstagram />
              <span>@inclusivoplus</span>
            </div>

            <div className="contacto-item">
              <FaPhoneAlt />
              <span>Lunes a Viernes | 09:00 - 18:00</span>
            </div>

            <div className="mensaje-ayuda">
              💙 Nuestro equipo responderá tu consulta en un plazo de 24 a 48 horas hábiles.
            </div>

          </div>

        </div>

        <div className="categorias">

  <div
    className="categoria-card"
    onClick={() => navigate("/productos")}
  >
    <FaBoxOpen />
    <h4>Productos</h4>
    <p>Consultas sobre compras y ayudas técnicas.</p>

    <button className="categoria-btn">
      Ir a Productos
    </button>
  </div>

  <div
    className="categoria-card"
    onClick={() => navigate("/beneficios")}
  >
    <FaGift />
    <h4>Beneficios</h4>
    <p>Información sobre beneficios disponibles.</p>

    <button className="categoria-btn">
      Ver Beneficios
    </button>
  </div>

  <div
    className="categoria-card"
    onClick={() => navigate("/recursos")}
  >
    <FaUniversalAccess />
    <h4>Materiales Adaptados</h4>
    <p>Recursos accesibles y materiales de apoyo.</p>

    <button className="categoria-btn">
      Ver Recursos
    </button>
  </div>

  <div
    className="categoria-card"
    onClick={() => navigate("/actividades")}
  >
    <FaCalendarAlt />
    <h4>Actividades</h4>
    <p>Eventos y talleres inclusivos.</p>

    <button className="categoria-btn">
      Ver Actividades
    </button>
  </div>

</div>

      </div>
    </div>
  );
}

export default Mensajes;
