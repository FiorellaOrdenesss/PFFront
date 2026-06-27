// src/components/NavbarProductos.jsx
import "bootstrap/dist/css/bootstrap.min.css";

function NavbarProductos({ busqueda, setBusqueda, carrito, onCarritoClick }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
      <a className="navbar-brand fw-bold text-primary" href="/productos">
        Productos
      </a>
      <form className="d-flex ms-auto">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-primary position-relative"
          onClick={onCarritoClick}
        >
          Carrito
          <span className="position-absolute top-0 s-100 translate-middle badge rounded-pill bg-danger">
            {carrito.length}
          </span>
        </button>
      </form>
    </nav>
  );
}

export default NavbarProductos;
