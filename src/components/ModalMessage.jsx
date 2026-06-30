import "bootstrap/dist/css/bootstrap.min.css";

function ModalMessage({ title = "", message = "", onClose }) {
  if (!message) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalMessage;
