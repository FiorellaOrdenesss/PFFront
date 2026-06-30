// pages/ Register.jsx
import { useState } from "react";
import { registerUsuario } from "../services/usuarios";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import ModalMessage from "../components/ModalMessage";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [rol, setRol] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUsuario({ nombre, email, password, rol });
      setMessage("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      console.error("Error al registrarte:", err);
      setMessage("Error al registrarte");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <span className="page-badge">Inclusivo+</span>
        <h1>Crear cuenta</h1>
        <p className="text-muted">
          Regístrate como usuario o administrador para acceder al panel.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="beneficio-card"
          style={{ maxWidth: 520, width: "100%" }}
        >
          <div className="beneficio-content">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  className="form-control auth-input"
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  className="form-control auth-input"
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  className="form-control auth-input"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tipo de cuenta</label>
                <div>
                  <label className="me-3">
                    <input
                      type="radio"
                      name="rol"
                      value="user"
                      checked={rol === "user"}
                      onChange={() => setRol("user")}
                    />{" "}
                    <span style={{ marginLeft: 8 }}>Usuario</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rol"
                      value="admin"
                      checked={rol === "admin"}
                      onChange={() => setRol("admin")}
                    />{" "}
                    <span style={{ marginLeft: 8 }}>Administrador</span>
                  </label>
                </div>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/login")}
                >
                  Volver al login
                </button>
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ModalMessage
        title="Registro"
        message={message}
        onClose={() => setMessage("")}
      />
    </div>
  );
}

export default Register;
