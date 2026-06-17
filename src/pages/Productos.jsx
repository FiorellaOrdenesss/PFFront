import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/productos";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProductos(token)
        .then((data) => setProductos(data))
        .catch((err) => console.error("Error al traer productos:", err));
    }
  }, []);

  const handleAddProducto = async () => {
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

  const handleUpdateProducto = async (id) => {
    const token = localStorage.getItem("token");
    const actualizado = { nombre: prompt("Nuevo nombre:") };
    const res = await updateProducto(id, actualizado, token);
    setProductos(productos.map((p) => (p.id === id ? res : p)));
  };

  const handleDeleteProducto = async (id) => {
    const token = localStorage.getItem("token");
    await deleteProducto(id, token);
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <div className="productos-container">
      <header className="productos-header">
        <h1>🛒 Venta de productos</h1>
        <p>Explora nuestra selección exclusiva con estilo y accesibilidad</p>
        <button className="btn-add" onClick={handleAddProducto}>
          ➕ Agregar producto
        </button>
      </header>

      {productos.length === 0 ? (
        <p className="no-productos">No hay productos disponibles</p>
      ) : (
        <div className="productos-grid">
          {productos.map((p) => (
            <div key={p.id} className="producto-card">
              <div className="producto-info">
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
                <div className="producto-meta">
                  <span className="precio">💲 {p.precio}</span>
                  <span className="stock">Stock: {p.stock}</span>
                </div>
              </div>
              <div className="producto-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleUpdateProducto(p.id)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteProducto(p.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;
