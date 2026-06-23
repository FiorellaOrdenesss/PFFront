// src/components/ModalCarrito.jsx
import "bootstrap/dist/css/bootstrap.min.css";

function ModalCarrito({
  carrito,
  onClose,
  onAgregar,
  onReducir,
  onEliminar,
  onFinalizar,
}) {
  const total = carrito.reduce(
    (acc, p) => acc + Number(p.precio) * p.cantidad,
    0,
  );

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
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tu carrito</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {carrito.length === 0 ? (
              <p className="text-muted">El carrito está vacío</p>
            ) : (
              carrito.map((p) => (
                <div
                  key={p.id}
                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                  <div>
                    <strong>{p.nombre}</strong>
                    <p className="mb-0 text-success">
                      ${Number(p.precio).toFixed(2)}{" "}
                      <span className="text-muted">x {p.cantidad}</span>
                    </p>
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => onReducir(p.id)}
                    >
                      −
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => onAgregar(p)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onEliminar(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="modal-footer d-flex flex-column align-items-end">
            <p className="fw-bold text-primary mb-2">
              Total: ${total.toFixed(2)}
            </p>
            <button className="btn btn-primary w-100" onClick={onFinalizar}>
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCarrito;
