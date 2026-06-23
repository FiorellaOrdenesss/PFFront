// src/components/ModalDetalle.jsx
import "./ModalDetalle.css";

function ModalDetalle({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{item.titulo || item.nombre}</h2>
        <p>{item.descripcion}</p>
        {item.disponibilidad !== undefined && (
          <p>
            Estado:{" "}
            <strong>{item.disponibilidad ? "Activo" : "Inactivo"}</strong>
          </p>
        )}
        {item.fecha && (
          <p>Fecha: {new Date(item.fecha).toLocaleDateString()}</p>
        )}
        {item.ubicacion && <p>Ubicación: {item.ubicacion}</p>}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalDetalle;
