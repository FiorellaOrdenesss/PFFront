// src/components/ModalDetalle.jsx
import "bootstrap/dist/css/bootstrap.min.css";

function ModalDetalle({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">{item.titulo || item.nombre}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {item.descripcion && <p>{item.descripcion}</p>}

            {item.disponibilidad !== undefined && (
              <p>
                Estado:{" "}
                <strong
                  className={
                    item.disponibilidad ? "text-success" : "text-danger"
                  }
                >
                  {item.disponibilidad ? "Activo" : "Inactivo"}
                </strong>
              </p>
            )}

            {item.fecha && (
              <p>Fecha: {new Date(item.fecha).toLocaleDateString()}</p>
            )}

            {item.ubicacion && <p>Ubicación: {item.ubicacion}</p>}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalle;
