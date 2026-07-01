// src/pages/Administrador.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import ModalCarrito from "../components/ModalCarrito";
import Footer from "../components/Footer";
import "./Administrador.css";

function Administrador() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
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
  const [filtroProductos, setFiltroProductos] = useState("");
  const [filtroBeneficios, setFiltroBeneficios] = useState("");
  const [filtroActividades, setFiltroActividades] = useState("");
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [productoEditForm, setProductoEditForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

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

  const abrirEditarProducto = (producto) => {
    setEditandoProducto(producto);
    setProductoEditForm({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio || "",
      stock: producto.stock || "",
    });
  };

  const handleActualizarProducto = async (e) => {
    e.preventDefault();
    if (!editandoProducto) return;

    const token = localStorage.getItem("token");
    const actualizadoData = {
      nombre: productoEditForm.nombre,
      descripcion: productoEditForm.descripcion,
      precio: parseFloat(productoEditForm.precio) || 0,
      stock: parseInt(productoEditForm.stock, 10) || 0,
    };
    const res = await updateProducto(
      editandoProducto.id,
      actualizadoData,
      token,
    );
    const listadoActualizado = productos.map((p) =>
      p.id === res.id ? res : p,
    );
    setProductos(listadoActualizado);
    calcularMetricas(listadoActualizado);
    setEditandoProducto(null);
  };

  const cerrarEditarProducto = () => {
    setEditandoProducto(null);
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
        prompt("Nueva descripción:", beneficio.descripcion) ||
        beneficio.descripcion,
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
        prompt("Nueva descripción:", actividad.descripcion) ||
        actividad.descripcion,
      fecha:
        prompt("Nueva fecha (YYYY-MM-DD):", actividad.fecha) || actividad.fecha,
      ubicacion:
        prompt("Nueva ubicación:", actividad.ubicacion) || actividad.ubicacion,
    };

    const res = await updateActividad(id, actualizado, token);
    const listadoActualizado = actividades.map((a) => (a.id === id ? res : a));
    actualizarActividades(listadoActualizado);
  };

  const handleEliminarActividad = async (id) => {
    const token = localStorage.getItem("token");
    await deleteActividad(id, token);
    const listadoActualizado = actividades.filter((a) => a.id !== id);
    actualizarActividades(listadoActualizado);
  };

  const productosFiltrados = productos.filter((producto) => {
    const texto = `${producto.nombre} ${producto.descripcion}`.toLowerCase();
    return texto.includes(filtroProductos.toLowerCase());
  });

  const beneficiosFiltrados = beneficios.filter((beneficio) => {
    const texto = `${beneficio.titulo} ${beneficio.descripcion}`.toLowerCase();
    return texto.includes(filtroBeneficios.toLowerCase());
  });

  const actividadesFiltradas = actividades.filter((actividad) => {
    const texto =
      `${actividad.nombre} ${actividad.descripcion} ${actividad.ubicacion}`.toLowerCase();
    return texto.includes(filtroActividades.toLowerCase());
  });

  return (
    <div
      className="container-fluid p-0 administrador-page"
      style={{ backgroundColor: "#F5F5F9", minHeight: "100vh" }}
    >

      <div className="administrador-content">
        <div className="administrador-hero">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <h2 className="fw-bold mb-2 text-primary">¡Hola, Fiorella!</h2>
              <p className="text-muted mb-0">
                Bienvenida al panel de administración Inclusivo+
              </p>
            </div>
            <Link to="/home" className="btn btn-outline-primary">
              ← Volver a Home
            </Link>
          </div>
        </div>

        <div className="metric-cards mb-4">
          <div className="metric-card metric-card-usuarios">
            <div>
              <h6>Usuarios</h6>
              <p className="metric-number">{usuarios}</p>

              {mostrarModal && (
                <ModalCarrito
                  carrito={carrito}
                  onClose={() => setMostrarModal(false)}
                  onAgregar={(p) =>
                    setCarrito((c) =>
                      c.map((it) =>
                        it.id === p.id
                          ? { ...it, cantidad: it.cantidad + 1 }
                          : it,
                      ),
                    )
                  }
                  onReducir={(id) =>
                    setCarrito((c) =>
                      c
                        .map((it) =>
                          it.id === id
                            ? { ...it, cantidad: it.cantidad - 1 }
                            : it,
                        )
                        .filter((it) => it.cantidad > 0),
                    )
                  }
                  onEliminar={(id) =>
                    setCarrito((c) => c.filter((it) => it.id !== id))
                  }
                  onFinalizar={() => setMostrarModal(false)}
                />
              )}
            </div>
          </div>
          <div className="metric-card metric-card-activos">
            <div>
              <h6>Activos</h6>
              <p className="metric-number">{productosActivos}</p>
            </div>
          </div>
          <div className="metric-card metric-card-sinstock">
            <div>
              <h6>Sin stock</h6>
              <p className="metric-number">{sinStock}</p>
            </div>
          </div>
          <div className="metric-card metric-card-bajostock">
            <div>
              <h6>Stock &lt; 5</h6>
              <p className="metric-number">{bajoStock}</p>
            </div>
          </div>
          <div className="metric-card metric-card-vendidos">
            <div>
              <h6>Vendidos</h6>
              <p className="metric-number">{productosVendidos}</p>
            </div>
          </div>
          <div className="metric-card metric-card-ventas">
            <div>
              <h6>Ventas totales</h6>
              <p className="metric-number">${ventasTotales.toFixed(2)}</p>
            </div>
          </div>
          <div className="metric-card metric-card-beneficios">
            <div>
              <h6>Beneficios</h6>
              <p className="metric-number">{beneficios.length}</p>
            </div>
          </div>
          <div className="metric-card metric-card-beneficios-activos">
            <div>
              <h6>Beneficios activos</h6>
              <p className="metric-number">{beneficiosActivos}</p>
            </div>
          </div>
          <div className="metric-card metric-card-actividades">
            <div>
              <h6>Actividades</h6>
              <p className="metric-number">{actividades.length}</p>
            </div>
          </div>
          <div className="metric-card metric-card-actividades-proximas">
            <div>
              <h6>Actividades próximas</h6>
              <p className="metric-number">{actividadesProximas}</p>
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

          <div className="filter-controls">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar productos"
              value={filtroProductos}
              onChange={(e) => setFiltroProductos(e.target.value)}
            />
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
                {productosFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>${Number(p.precio).toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => abrirEditarProducto(p)}
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
            <button
              className="btn btn-success"
              onClick={handleAgregarBeneficio}
            >
              Agregar beneficio
            </button>
          </div>

          <div className="filter-controls">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar beneficios"
              value={filtroBeneficios}
              onChange={(e) => setFiltroBeneficios(e.target.value)}
            />
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
                {beneficiosFiltrados.map((b) => (
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
            <button
              className="btn btn-success"
              onClick={handleAgregarActividad}
            >
              Agregar actividad
            </button>
          </div>

          <div className="filter-controls">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar actividades"
              value={filtroActividades}
              onChange={(e) => setFiltroActividades(e.target.value)}
            />
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
                {actividadesFiltradas.map((a) => (
                  <tr key={a.id}>
                    <td>{a.nombre}</td>
                    <td>{a.descripcion}</td>
                    <td>
                      {a.fecha ? new Date(a.fecha).toLocaleDateString() : "-"}
                    </td>
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
        {editandoProducto && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            onClick={cerrarEditarProducto}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar producto</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={cerrarEditarProducto}
                  ></button>
                </div>
                <form onSubmit={handleActualizarProducto}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        value={productoEditForm.nombre}
                        onChange={(e) =>
                          setProductoEditForm((prev) => ({
                            ...prev,
                            nombre: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={productoEditForm.descripcion}
                        onChange={(e) =>
                          setProductoEditForm((prev) => ({
                            ...prev,
                            descripcion: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Precio</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={productoEditForm.precio}
                          onChange={(e) =>
                            setProductoEditForm((prev) => ({
                              ...prev,
                              precio: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Stock</label>
                        <input
                          type="number"
                          className="form-control"
                          value={productoEditForm.stock}
                          onChange={(e) =>
                            setProductoEditForm((prev) => ({
                              ...prev,
                              stock: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={cerrarEditarProducto}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Administrador;
