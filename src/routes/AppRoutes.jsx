import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Productos from "../pages/Productos";
import Administrador from "../pages/Administrador";
function AppRoutes() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/beneficios"
          element={token ? <Beneficios /> : <Navigate to="/login" />}
        />
        <Route
          path="/actividades"
          element={token ? <Actividades /> : <Navigate to="/login" />}
        />
        <Route
          path="/recursos"
          element={token ? <Recursos /> : <Navigate to="/login" />}
        />
        <Route
          path="/turnos"
          element={token ? <Turnos /> : <Navigate to="/login" />}
        />
        <Route
          path="/mensajes"
          element={token ? <Mensajes /> : <Navigate to="/login" />}
        />
        <Route
          path="/perfil"
          element={token ? <Perfil /> : <Navigate to="/login" />}
        />
        <Route
          path="/configuracion"
          element={token ? <Configuracion /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/productos"
          element={token ? <Productos /> : <Navigate to="/login" />}
        />
        <Route
          path="/administrador"
          element={token ? <Administrador /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
