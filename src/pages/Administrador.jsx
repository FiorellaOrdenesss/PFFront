// src/pages/Administrador.jsx
import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/productos";
import {
  getBeneficios,
  createBeneficio,
  updateBeneficio,
  deleteBeneficio,
} from "../services/beneficios";
import {
  getActividades,
  createActividad,
  updateActividad,
  deleteActividad,
} from "../services/actividades";
import { getUsuarios } from "../services/usuarios";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarProductos from "../components/NavbarProductos";
import "./Administrador.css";

function Administrador() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [usuarios, setUsuarios] = useState(0);
  const [productosActivos, setProductosActivos] = useState(0);
  const [sinStock, setSinStock] = useState(0);
  const [bajoStock, setBajoStock] = useState(0);
  const [productosVendidos, setProductosVendidos] = useState(0);
  const [ventasTotales, setVentasTotales] = useState(0);

  const [beneficios, setBeneficios] = useState([]);
  const [beneficiosActivos, setBeneficiosActivos] = useState(0);
  const [actividades, setActividades] = useState([]);
  const [actividadesProximas, setActividadesProximas] = useState(0);

  // nuevas métricas desde localStorage
  const [comprasLocal, setComprasLocal] = useState({
    cantidad: 0,
    totalMonto: 0,
    productosVendidos: 0,
  });

  const calcularMetricas = (data, compras = null) => {
    setProductosActivos(data.length);
    setSinStock(data.filter((p) => p.stock === 0).length);
    setBajoStock(data.filter((p) => p.stock > 0 && p.stock < 5).length);

    const ventasEnProductos = data.reduce((acc, p) => acc + (p.ventas || 0), 0);
    const montoEnProductos = data.reduce(
      (acc, p) => acc + (p.ventas || 0) * (Number(p.precio) || 0),
      0,
    );

    const totalVendidos = compras?.productosVendidos ?? ventasEnProductos;
    const totalVentas = compras?.totalMonto ?? montoEnProductos;

    setProductosVendidos(totalVendidos);
    setVentasTotales(totalVentas);
  };

  const actualizarBeneficios = (lista) => {
    setBeneficios(lista);
    setBeneficiosActivos(lista.filter((b) => b.disponibilidad).length);
  };

  const actualizarActividades = (lista) => {
    setActividades(lista);
    const hoy = new Date();
    setActividadesProximas(
      lista.filter((a) => {
        const fecha = a.fecha ? new Date(a.fecha) : null;
        return fecha ? fecha >= hoy : true;
      }).length,
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProductos(token)
        .then((data) => {
          setProductos(data);
          const comprasData = JSON.parse(localStorage.getItem("compras")) || {
            cantidad: 0,
            totalMonto: 0,
            productosVendidos: 0,
          };
          setComprasLocal(comprasData);
          calcularMetricas(data, comprasData);
        })
        .catch((err) => console.error("Error al traer productos:", err));

      getUsuarios(token)
        .then((data) => {
          const usuariosNoAdmin = data.filter((u) => u.rol !== "admin");
          setUsuarios(usuariosNoAdmin.length);
        })
        .catch((err) => console.error("Error al traer usuarios:", err));

      getBeneficios(token)
        .then((data) => {
          actualizarBeneficios(data);
        })
        .catch((err) => console.error("Error al traer beneficios:", err));

      getActividades(token)
        .then((data) => {
          actualizarActividades(data);
        })
        .catch((err) => console.error("Error al traer actividades:", err));
    }

    // leer compras guardadas en localStorage
    const comprasData = JSON.parse(localStorage.getItem("compras")) || {
      cantidad: 0,
      totalMonto: 0,
      productosVendidos: 0,
    };
    setComprasLocal(comprasData);
  }, []);

  const handleAgregar = async () => {
    const token = localStorage.getItem("token");
    const nuevo = {
      nombre: prompt("Nombre del producto:"),
      descripcion: prompt("Descripción:"),
      precio: parseFloat(prompt("Precio:")),
      stock: parseInt(prompt("Stock disponible:"), 10),
    };
    const res = await createProducto(nuevo, token);
    const actualizado = [...productos, res];
    setProductos(actualizado);
    calcularMetricas(actualizado);
  };

  const handleEditar = async (id) => {
    const token = localStorage.getItem("token");
    const actualizado = { nombre: prompt("Nuevo nombre:") };
    const res = await updateProducto(id, actualizado, token);
    const listadoActualizado = productos.map((p) => (p.id === id ? res : p));
    setProductos(listadoActualizado);
    calcularMetricas(listadoActualizado);
  };

  const handleEliminar = async (id) => {
    const token = localStorage.getItem("token");
    await deleteProducto(id, token);
    const listadoActualizado = productos.filter((p) => p.id !== id);
    setProductos(listadoActualizado);
    calcularMetricas(listadoActualizado);
  };

  const handleAgregarBeneficio = async () => {
    const token = localStorage.getItem("token");
    const titulo = prompt("Título del beneficio:");
    if (!titulo) return;

    const nuevo = {
      titulo,
      descripcion: prompt("Descripción:") || "",
      disponibilidad: true,
    };

    const res = await createBeneficio(nuevo, token);
    const actualizado = [...beneficios, res];
    actualizarBeneficios(actualizado);
  };

  const handleEditarBeneficio = async (id) => {
    const token = localStorage.getItem("token");
    const beneficio = beneficios.find((b) => b.id === id);
    if (!beneficio) return;

    const actualizado = {
      titulo: prompt("Nuevo título:", beneficio.titulo) || beneficio.titulo,
      descripcion:
        prompt("Nueva descripción:", beneficio.descripcion) || beneficio.descripcion,
    };

    const res = await updateBeneficio(id, actualizado, token);
    const listadoActualizado = beneficios.map((b) => (b.id === id ? res : b));
    actualizarBeneficios(listadoActualizado);
  };

  const handleEliminarBeneficio = async (id) => {
    const token = localStorage.getItem("token");
    await deleteBeneficio(id, token);
    const listadoActualizado = beneficios.filter((b) => b.id !== id);
    actualizarBeneficios(listadoActualizado);
  };

  const handleAgregarActividad = async () => {
    const token = localStorage.getItem("token");
    const nombre = prompt("Nombre de la actividad:");
    if (!nombre) return;

    const nueva = {
      nombre,
      descripcion: prompt("Descripción:") || "",
      fecha: prompt("Fecha (YYYY-MM-DD):") || new Date().toISOString(),
      ubicacion: prompt("Ubicación:") || "Sin ubicación",
    };

    const res = await createActividad(nueva, token);
    const actualizado = [...actividades, res];
    actualizarActividades(actualizado);
  };

  const handleEditarActividad = async (id) => {
    const token = localStorage.getItem("token");
    const actividad = actividades.find((a) => a.id === id);
    if (!actividad) return;

    const actualizado = {
      nombre: prompt("Nuevo nombre:", actividad.nombre) || actividad.nombre,
      descripcion:
        prompt("Nueva descripción:", actividad.descripcion) || actividad.descripcion,
      fecha:
        prompt("Nueva fecha (YYYY-MM-DD):", actividad.fecha) || actividad.fecha,
      ubicacion:
        prompt("Nueva ubicación:", actividad.ubicacion) || actividad.ubicacion,
    };

    const res = await updateActividad(id, actualizado, token);
    const listadoActualizado = actividades.map((a) =>
      a.id === id ? res : a,
    );
    actualizarActividades(listadoActualizado);
  };

  const handleEliminarActividad = async (id) => {
    const token = localStorage.getItem("token");
    await deleteActividad(id, token);
    const listadoActualizado = actividades.filter((a) => a.id !== id);
    actualizarActividades(listadoActualizado);
  };

  return (
    <div
      className="container-fluid p-0 administrador-page"
      style={{ backgroundColor: "#F5F5F9", minHeight: "100vh" }}
    >
      <NavbarProductos
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        carrito={carrito}
        onCarritoClick={() => alert("Abrir modal del carrito")}
      />

      <div className="administrador-content">
        <div className="administrador-hero">
          <h2 className="fw-bold mb-2 text-primary">¡Hola, Fiorella!</h2>
          <p className="text-muted mb-4">
            Bienvenida al panel de administración Inclusivo+
          </p>
        </div>

        {/* Tarjetas de métricas */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6 metric-cards mb-4">
          <div className="col">
            <div className="metric-card metric-card-usuarios">
              <div>
                <h6>Usuarios</h6>
                <p className="metric-number">{usuarios}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-activos">
              <div>
                <h6>Activos</h6>
                <p className="metric-number">{productosActivos}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-sinstock">
              <div>
                <h6>Sin stock</h6>
                <p className="metric-number">{sinStock}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-bajostock">
              <div>
                <h6>Stock &lt; 5</h6>
                <p className="metric-number">{bajoStock}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-vendidos">
              <div>
                <h6>Vendidos</h6>
                <p className="metric-number">{productosVendidos}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-ventas">
              <div>
                <h6>Ventas totales</h6>
                <p className="metric-number">${ventasTotales.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-beneficios">
              <div>
                <h6>Beneficios</h6>
                <p className="metric-number">{beneficios.length}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-beneficios-activos">
              <div>
                <h6>Beneficios activos</h6>
                <p className="metric-number">{beneficiosActivos}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-actividades">
              <div>
                <h6>Actividades</h6>
                <p className="metric-number">{actividades.length}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="metric-card metric-card-actividades-proximas">
              <div>
                <h6>Actividades próximas</h6>
                <p className="metric-number">{actividadesProximas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="table-wrapper">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center table-actions">
            <div>
              <h3 className="fw-semibold mb-2 mb-md-0 text-dark">
                Dashboard de Productos
              </h3>
              <p className="text-muted mb-0">
                Aquí puedes revisar y administrar el inventario.
              </p>
            </div>
            <button className="btn btn-success" onClick={handleAgregar}>
              Agregar producto
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-bordered mb-0">
              <thead style={{ backgroundColor: "#6343FF", color: "white" }}>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>${Number(p.precio).toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditar(p.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminar(p.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-wrapper mt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center table-actions">
            <div>
              <h3 className="fw-semibold mb-2 mb-md-0 text-dark">
                Dashboard de Beneficios
              </h3>
              <p className="text-muted mb-0">
                Revisa y administra los beneficios disponibles.
              </p>
            </div>
            <button className="btn btn-success" onClick={handleAgregarBeneficio}>
              Agregar beneficio
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-bordered mb-0">
              <thead style={{ backgroundColor: "#6343FF", color: "white" }}>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Disponibilidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {beneficios.map((b) => (
                  <tr key={b.id}>
                    <td>{b.titulo}</td>
                    <td>{b.descripcion}</td>
                    <td>{b.disponibilidad ? "Activo" : "Inactivo"}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditarBeneficio(b.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminarBeneficio(b.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-wrapper mt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center table-actions">
            <div>
              <h3 className="fw-semibold mb-2 mb-md-0 text-dark">
                Dashboard de Actividades
              </h3>
              <p className="text-muted mb-0">
                Revisa y administra las actividades programadas.
              </p>
            </div>
            <button className="btn btn-success" onClick={handleAgregarActividad}>
              Agregar actividad
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-bordered mb-0">
              <thead style={{ backgroundColor: "#6343FF", color: "white" }}>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Ubicación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {actividades.map((a) => (
                  <tr key={a.id}>
                    <td>{a.nombre}</td>
                    <td>{a.descripcion}</td>
                    <td>{a.fecha ? new Date(a.fecha).toLocaleDateString() : "-"}</td>
                    <td>{a.ubicacion}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditarActividad(a.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminarActividad(a.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Administrador;
