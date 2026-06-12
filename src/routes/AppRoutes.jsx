import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Beneficios from "../pages/Beneficios";
import Actividades from "../pages/Actividades";
import Recursos from "../pages/Recursos";
import Turnos from "../pages/Turnos";
import Mensajes from "../pages/Mensajes";
import Perfil from "../pages/Perfil";
import Configuracion from "../pages/Configuracion";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/beneficios" element={<Beneficios />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/mensajes" element={<Mensajes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
