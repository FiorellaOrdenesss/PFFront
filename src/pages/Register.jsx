// pages/ Register.jsx
import { useState } from "react";
import { registerUsuario } from "../services/usuarios";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUsuario({ nombre, email, password }); 
      alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      console.error("Error al registrarte:", err);
      alert("Error al registrarte");
    }
  };

  return (
    <div className="register-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
