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
import PrincipalLayout from "../components/PrincipalLayout";
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
          element={
            token ? (
              <PrincipalLayout>
                <Beneficios />
              </PrincipalLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/actividades"
          element={
            token ? (
              <PrincipalLayout>
                <Actividades />
              </PrincipalLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/recursos"
          element={
            token ? (
              <PrincipalLayout>
                <Recursos />
              </PrincipalLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/turnos"
          element={
            token ? (
              <PrincipalLayout>
                <Turnos />
              </PrincipalLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/mensajes"
          element={
            token ? (
              <PrincipalLayout>
                <Mensajes />
              </PrincipalLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/perfil"
          element={
            token ? (
              <PrincipalLayout>
                <Perfil />
              </PrincipalLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/configuracion"
          element={
            token ? (
              <PrincipalLayout>
                <Configuracion />
              </PrincipalLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/productos"
          element={
            token ? (
              <PrincipalLayout>
                <Productos />
              </PrincipalLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
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
