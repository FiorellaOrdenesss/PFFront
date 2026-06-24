// src/pages/Productos.jsx
import { useEffect, useState } from "react";
import { getProductos } from "../services/productos";
import NavbarProductos from "../components/NavbarProductos";
import ModalCarrito from "../components/ModalCarrito";
import "bootstrap/dist/css/bootstrap.min.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const savedCarrito = localStorage.getItem("carrito");
    if (savedCarrito) setCarrito(JSON.parse(savedCarrito));
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

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const handleAgregarCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        ),
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const handleEliminarCarrito = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  const handleReducirCantidad = (id) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const handleFinalizarCompra = () => {
    alert("Compra realizada con éxito");
    setCarrito([]);
    localStorage.removeItem("carrito");
    setMostrarModal(false);
  };

  return (
    <div className="container my-4">
      <NavbarProductos
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        carrito={carrito}
        onCarritoClick={() => setMostrarModal(true)}
      />

      {productosFiltrados.length === 0 ? (
        <p className="text-muted mt-4">No hay productos disponibles</p>
      ) : (
        <div className="row mt-4">
          {productosFiltrados.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text">{p.descripcion}</p>
                  <p className="fw-bold text-success">${p.precio}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleAgregarCarrito(p)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
}

export default Productos;
