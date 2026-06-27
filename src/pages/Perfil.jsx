import { useEffect, useState } from "react";
import api from "../api";
import "../pages/Perfil.css";
import { PersonCircle } from "react-bootstrap-icons";

function Perfil() {
  const [usuario, setUsuario] = useState({
    id: null,
    nombre: "",
    email: "",
    rol: "",
    nombres: "",
    apellidos: "",
    profesion: "",
    discapacidad: "",
    discapacidadOtro: "",
    pension: "",
    genero: "",
    departamento: "",
    localidad: "",
    localidadOtro: "",
    apoyo: "",
    telefono: "",
    emergencia: "",
    nacimiento: "",
    objetivo: "",
  });

  const [editando, setEditando] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const localidadesUruguay = {
    Artigas: ["Artigas", "Bella Unión", "Otro"],
    Canelones: [
      "Canelones",
      "Las Piedras",
      "Ciudad de la Costa",
      "Atlántida",
      "Otro",
    ],
    CerroLargo: ["Melo", "Río Branco", "Otro"],
    Colonia: ["Colonia del Sacramento", "Carmelo", "Juan Lacaze", "Otro"],
    Durazno: ["Durazno", "Sarandí del Yí", "Otro"],
    Flores: ["Trinidad", "Otro"],
    Florida: ["Florida", "Sarandí Grande", "Otro"],
    Lavalleja: ["Minas", "Otro"],
    Maldonado: ["Maldonado", "Punta del Este", "San Carlos", "Otro"],
    Montevideo: ["Montevideo", "Otro"],
    Paysandú: ["Paysandú", "Guichón", "Otro"],
    RíoNegro: ["Fray Bentos", "Young", "Otro"],
    Rivera: ["Rivera", "Tranqueras", "Otro"],
    Rocha: ["Rocha", "Chuy", "Otro"],
    Salto: ["Salto", "Otro"],
    SanJosé: ["San José de Mayo", "Libertad", "Otro"],
    Soriano: ["Mercedes", "Dolores", "Otro"],
    Tacuarembó: ["Tacuarembó", "Paso de los Toros", "Otro"],
    TreintaYTres: ["Treinta y Tres", "Otro"],
  };

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const token = localStorage.getItem("token");
        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId) {
          console.error("usuarioId no encontrado en localStorage");
          return;
        }

        const res = await api.get(`/usuarios/${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          const usuarioBack = res.data;
          const usuarioLocal = localStorage.getItem(
            `usuarioExtra_${usuarioBack.id}`,
          );
          const extra = usuarioLocal ? JSON.parse(usuarioLocal) : {};

          setUsuario({
            id: usuarioBack.id,
            nombre: usuarioBack.nombre,
            email: usuarioBack.email,
            rol: usuarioBack.rol,
            ...extra, // solo fusiona si corresponde al mismo id
          });
        }
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        const usuarioLocal = localStorage.getItem("usuarioExtra_fallback");
        if (usuarioLocal) {
          setUsuario(JSON.parse(usuarioLocal));
        }
      }
    }
    fetchPerfil();
  }, []);

  const handleGuardarPerfil = () => {
    const extra = {
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      profesion: usuario.profesion,
      discapacidad: usuario.discapacidad,
      discapacidadOtro: usuario.discapacidadOtro,
      pension: usuario.pension,
      genero: usuario.genero,
      departamento: usuario.departamento,
      localidad: usuario.localidad,
      localidadOtro: usuario.localidadOtro,
      apoyo: usuario.apoyo,
      telefono: usuario.telefono,
      emergencia: usuario.emergencia,
      nacimiento: usuario.nacimiento,
      objetivo: usuario.objetivo,
    };

    localStorage.setItem(`usuarioExtra_${usuario.id}`, JSON.stringify(extra));
    setEditando(false);
    setMostrarModal(true);
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h1 className="perfil-titulo">Mi Perfil</h1>

        <div className="perfil-header">
          {fotoPerfil ? (
            <img src={fotoPerfil} alt="Perfil" className="perfil-foto" />
          ) : (
            <PersonCircle className="perfil-avatar" />
          )}

          {editando && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const archivo = e.target.files[0];
                if (archivo) {
                  setFotoPerfil(URL.createObjectURL(archivo));
                }
              }}
            />
          )}

          <h2>
            {usuario.nombres} {usuario.apellidos}
          </h2>
          <p className="perfil-subtitulo">{usuario.profesion}</p>
          <p className="perfil-email">{usuario.email}</p>
        </div>

        <div className="perfil-info">
          {/* Profesión */}
          <div className="info-item">
            <strong>Profesión</strong>
            {editando ? (
              <input
                type="text"
                value={usuario.profesion || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, profesion: e.target.value })
                }
              />
            ) : (
              <span>{usuario.profesion}</span>
            )}
          </div>

          {/* Email */}
          <div className="info-item">
            <strong>Email</strong>
            {editando ? (
              <input
                type="email"
                value={usuario.email || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                }
              />
            ) : (
              <span>{usuario.email}</span>
            )}
          </div>

          {/* Nombres */}
          <div className="info-item">
            <strong>Nombres</strong>
            {editando ? (
              <input
                type="text"
                value={usuario.nombres || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, nombres: e.target.value })
                }
              />
            ) : (
              <span>{usuario.nombres}</span>
            )}
          </div>

          {/* Apellidos */}
          <div className="info-item">
            <strong>Apellidos</strong>
            {editando ? (
              <input
                type="text"
                value={usuario.apellidos || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, apellidos: e.target.value })
                }
              />
            ) : (
              <span>{usuario.apellidos}</span>
            )}
          </div>

          {/* Género */}
          <div className="info-item">
            <strong>Género</strong>
            {editando ? (
              <select
                value={usuario.genero || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, genero: e.target.value })
                }
              >
                <option value="">No especificar</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="no_binario">No binario</option>
                <option value="otro">Otro</option>
              </select>
            ) : (
              <span>{usuario.genero || "No especificado"}</span>
            )}
          </div>
          {/* Ciudad */}
          <div className="info-item">
            <strong>Ciudad</strong>
            {editando ? (
              <>
                <select
                  value={usuario.departamento || ""}
                  onChange={(e) =>
                    setUsuario({
                      ...usuario,
                      departamento: e.target.value,
                      localidad: "",
                      localidadOtro: "",
                    })
                  }
                >
                  <option value="">Seleccionar departamento</option>
                  {Object.keys(localidadesUruguay).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                {usuario.departamento && (
                  <select
                    value={usuario.localidad || ""}
                    onChange={(e) =>
                      setUsuario({ ...usuario, localidad: e.target.value })
                    }
                  >
                    <option value="">Seleccionar localidad</option>
                    {localidadesUruguay[usuario.departamento].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                )}

                {usuario.localidad === "Otro" && (
                  <input
                    type="text"
                    placeholder="Escribir localidad"
                    value={usuario.localidadOtro || ""}
                    onChange={(e) =>
                      setUsuario({ ...usuario, localidadOtro: e.target.value })
                    }
                  />
                )}
              </>
            ) : (
              <span>
                {usuario.localidad === "Otro"
                  ? `${usuario.localidadOtro}, ${usuario.departamento}`
                  : `${usuario.localidad}, ${usuario.departamento}`}
              </span>
            )}
          </div>

          {/* Tipo de discapacidad */}
          <div className="info-item">
            <strong>Tipo de discapacidad</strong>
            {editando ? (
              <>
                <select
                  value={usuario.discapacidad || ""}
                  onChange={(e) =>
                    setUsuario({ ...usuario, discapacidad: e.target.value })
                  }
                >
                  <option value="">Seleccionar</option>
                  <option value="visual">Visual</option>
                  <option value="auditiva">Auditiva</option>
                  <option value="motora">Motora</option>
                  <option value="intelectual">Intelectual</option>
                  <option value="psicosocial">Psicosocial</option>
                  <option value="otro">Otro</option>
                </select>

                {usuario.discapacidad === "otro" && (
                  <input
                    type="text"
                    placeholder="Especificar discapacidad"
                    value={usuario.discapacidadOtro || ""}
                    onChange={(e) =>
                      setUsuario({
                        ...usuario,
                        discapacidadOtro: e.target.value,
                      })
                    }
                  />
                )}
              </>
            ) : (
              <span>
                {usuario.discapacidad === "otro"
                  ? usuario.discapacidadOtro
                  : usuario.discapacidad || "No especificado"}
              </span>
            )}
          </div>
          <div className="info-item">
            <strong>Teléfono</strong>
            {editando ? (
              <input
                type="text"
                value={usuario.telefono || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, telefono: e.target.value })
                }
              />
            ) : (
              <span>{usuario.telefono}</span>
            )}
          </div>

          <div className="info-item">
            <strong>Contacto de emergencia</strong>
            {editando ? (
              <input
                type="text"
                value={usuario.emergencia || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, emergencia: e.target.value })
                }
              />
            ) : (
              <span>{usuario.emergencia}</span>
            )}
          </div>

          <div className="info-item">
            <strong>Fecha de nacimiento</strong>
            {editando ? (
              <input
                type="date"
                value={usuario.nacimiento || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, nacimiento: e.target.value })
                }
              />
            ) : (
              <span>{usuario.nacimiento}</span>
            )}
          </div>

          <div className="info-item">
            <strong>Objetivo principal</strong>
            {editando ? (
              <input
                type="text"
                value={usuario.objetivo || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, objetivo: e.target.value })
                }
              />
            ) : (
              <span>{usuario.objetivo}</span>
            )}
          </div>
        </div>

        <button
          className="editar-perfil-btn"
          onClick={() => {
            if (editando) {
              handleGuardarPerfil();
            } else {
              setEditando(true);
            }
          }}
        >
          {editando ? "Guardar Cambios" : "Editar Perfil"}
        </button>
      </div>
      {mostrarModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">✅ Perfil guardado</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Los datos fueron guardados correctamente en Local Storage.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setMostrarModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {mostrarModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Perfil guardado</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Los datos fueron guardados correctamente.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setMostrarModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;
