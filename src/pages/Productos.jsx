// src/pages/Productos.jsx
import { useEffect, useState } from "react";
import { getProductos, updateProducto } from "../services/productos";
import ModalCarrito from "../components/ModalCarrito";

import { FaShoppingCart, FaBoxOpen, FaSearch } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Productos.css";
import ModalMessage from "../components/ModalMessage";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedCarrito = localStorage.getItem("carrito");

    if (savedCarrito) {
      setCarrito(JSON.parse(savedCarrito));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getProductos(token)
        .then((data) => setProductos(data))
        .catch((err) => console.error("Error al traer productos:", err));
    }
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const totalItemsCarrito = carrito.reduce(
    (acc, item) => acc + (item.cantidad || 1),
    0,
  );

  const handleAgregarCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        ),
      );
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }
  };

  const handleEliminarCarrito = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
  };

  const handleReducirCantidad = (id) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const handleFinalizarCompra = async () => {
    const token = localStorage.getItem("token");

    try {
      let montoCompra = 0;

      let productosVendidosCompra = 0;

      for (const item of carrito) {
        await updateProducto(
          item.id,

          {
            ventas: (item.ventas || 0) + item.cantidad,
          },

          token,
        );

        montoCompra += item.precio * item.cantidad;

        productosVendidosCompra += item.cantidad;
      }

      const comprasPrevias = JSON.parse(localStorage.getItem("compras")) || {
        cantidad: 0,
        totalMonto: 0,
        productosVendidos: 0,
      };

      const nuevasCompras = {
        cantidad: comprasPrevias.cantidad + 1,

        totalMonto: comprasPrevias.totalMonto + montoCompra,

        productosVendidos:
          comprasPrevias.productosVendidos + productosVendidosCompra,
      };

      localStorage.setItem("compras", JSON.stringify(nuevasCompras));

      setMessage(`Compra realizada con éxito ✅\nMonto: $${montoCompra}`);

      setCarrito([]);

      localStorage.removeItem("carrito");

      setMostrarModal(false);
    } catch (error) {
      console.error(error);

      setMessage("Hubo un problema al registrar la compra");
    }
  };

  return (
    <div className="productos-page">
      {/* NavbarProductos removed - search and carrito controls remain in page */}

      <div className="productos-container">
        <div className="productos-header">
          <div className="productos-info">
            <span className="badge-inclusivo">Inclusivo+</span>

            <h1>Productos Accesibles</h1>

            <p>
              Descubre productos pensados para mejorar la calidad de vida y
              favorecer la autonomía de las personas con discapacidad.
            </p>
          </div>

          <div className="productos-resumen">
            <div className="resumen-card">
              <FaBoxOpen className="resumen-icon" />

              <h2>{productos.length}</h2>

              <span>Productos</span>
            </div>

            <button
              type="button"
              className="resumen-card"
              onClick={() => setMostrarModal(true)}
              aria-label="Abrir carrito"
            >
              <FaShoppingCart className="resumen-icon" />

              <h2>{totalItemsCarrito}</h2>

              <span>En carrito</span>
            </button>
          </div>
        </div>

        <div className="productos-buscador">
          <FaSearch />

          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="sin-productos">
            <FaBoxOpen size={70} />

            <h3>No hay productos disponibles</h3>

            <p>Cuando existan productos aparecerán aquí.</p>
          </div>
        ) : (
          <div className="productos-grid">
            {productosFiltrados.map((p) => (
              <div key={p.id} className="producto-card">
<div className="producto-imagen">
  <img
    src={p.imagen || "/productos/sin-imagen.png"}
    alt={p.nombre}
    className="producto-img"
    onError={(e) => {
      e.target.src = "/productos/sin-imagen.png";
    }}
  />
</div>
                <div className="producto-info">
                  <span className="producto-categoria">Producto Adaptado</span>

                  <h3>{p.nombre}</h3>

                  <p>{p.descripcion}</p>
                </div>

                <div className="producto-footer">
                  <div className="precio">${p.precio}</div>

                  <button
                    className="btn-agregar"
                    onClick={() => handleAgregarCarrito(p)}
                  >
                    <FaShoppingCart />
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {mostrarModal && (
        <ModalCarrito
          carrito={carrito}
          onClose={() => setMostrarModal(false)}
          onAgregar={handleAgregarCarrito}
          onReducir={handleReducirCantidad}
          onEliminar={handleEliminarCarrito}
          onFinalizar={handleFinalizarCompra}
        />
      )}

      <ModalMessage
        title="Compra"
        message={message}
        onClose={() => setMessage("")}
      />
    </div>
  );
}

export default Productos;
