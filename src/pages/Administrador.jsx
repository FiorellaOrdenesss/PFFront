// src/pages/Administrador.jsx
import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/productos";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarProductos from "../components/NavbarProductos";

function Administrador() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProductos(token)
        .then((data) => setProductos(data))
        .catch((err) => console.error("Error al traer productos:", err));
    }
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
    setProductos([...productos, res]);
  };

  const handleEditar = async (id) => {
    const token = localStorage.getItem("token");
    const actualizado = { nombre: prompt("Nuevo nombre:") };
    const res = await updateProducto(id, actualizado, token);
    setProductos(productos.map((p) => (p.id === id ? res : p)));
  };

  const handleEliminar = async (id) => {
    const token = localStorage.getItem("token");
    await deleteProducto(id, token);
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <div className="container-fluid p-0">
      <NavbarProductos
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        carrito={carrito}
        onCarritoClick={() => alert("Abrir modal del carrito")}
      />

      <div className="container my-4">
        <h2 className="mb-4">Dashboard de Administrador</h2>
        <button className="btn btn-success mb-3" onClick={handleAgregar}>
          Agregar producto
        </button>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
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
  );
}

export default Administrador;
