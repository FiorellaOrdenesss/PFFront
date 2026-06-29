import { useEffect, useState } from "react";
import api from "../api";
import "../pages/Perfil.css";

import {
  PersonCircle,
  CameraFill,
  PencilSquare,
  GeoAltFill,
  TelephoneFill,
  EnvelopeFill,
  CalendarFill,
  PersonBadgeFill,
  HeartPulseFill,
  AwardFill,
} from "react-bootstrap-icons";

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

        if (!usuarioId) return;

        const res = await api.get(`/usuarios/${usuarioId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usuarioBack = res.data;

        const usuarioLocal = localStorage.getItem(
          `usuarioExtra_${usuarioBack.id}`,
        );

        const extra = usuarioLocal
          ? JSON.parse(usuarioLocal)
          : {};

        setUsuario({
          id: usuarioBack.id,
          nombre: usuarioBack.nombre,
          email: usuarioBack.email,
          rol: usuarioBack.rol,
          ...extra,
        });

      } catch (err) {
        console.error(err);
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

    localStorage.setItem(
      `usuarioExtra_${usuario.id}`,
      JSON.stringify(extra),
    );

    setEditando(false);

    setMostrarModal(true);

  };

    return (
    <div className="perfil-page">

      <div className="perfil-banner">

        <div className="perfil-overlay">

          <div className="perfil-header">

            <div className="perfil-avatar-container">

              {fotoPerfil ? (

                <img
                  src={fotoPerfil}
                  alt="Perfil"
                  className="perfil-foto"
                />

              ) : (

                <PersonCircle className="perfil-avatar" />

              )}

              {editando && (

                <label className="btn-foto">

                  <CameraFill />

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const archivo = e.target.files[0];

                      if (archivo) {
                        setFotoPerfil(
                          URL.createObjectURL(archivo),
                        );
                      }
                    }}
                  />

                </label>

              )}

            </div>

            <div className="perfil-info-header">

              <span className="perfil-badge">

                Inclusivo+

              </span>

              <h1>
  {usuario.nombres
    ? `${usuario.nombres} ${usuario.apellidos}`
    : usuario.nombre || "Usuario"}
</h1>

              <h3>

                <AwardFill />

                {usuario.profesion || "Sin profesión"}

              </h3>

              <p>

                <EnvelopeFill />

                {usuario.email}

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="perfil-content">

        <div className="perfil-card">

          <div className="perfil-card-header">

            <h2>

              Información Personal

            </h2>

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

              <PencilSquare />

              {editando
                ? "Guardar Cambios"
                : "Editar Perfil"}

            </button>

          </div>

          <div className="perfil-grid">

          <div className="perfil-item">

  <div className="perfil-item-icon">
    <AwardFill />
  </div>

  <div className="perfil-item-content">

    <label>Profesión</label>

    {editando ? (
      <input
        type="text"
        value={usuario.profesion || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            profesion: e.target.value,
          })
        }
      />
    ) : (
      <span>{usuario.profesion}</span>
    )}

  </div>

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <EnvelopeFill />
  </div>

  <div className="perfil-item-content">

    <label>Email</label>

    {editando ? (
      <input
        type="email"
        value={usuario.email || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            email: e.target.value,
          })
        }
      />
    ) : (
      <span>{usuario.email}</span>
    )}

  </div>

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <PersonBadgeFill />
  </div>

  <div className="perfil-item-content">

    <label>Nombres</label>

    {editando ? (
      <input
        type="text"
        value={usuario.nombres || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            nombres: e.target.value,
          })
        }
      />
    ) : (
      <span>{usuario.nombres}</span>
    )}

  </div>

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <PersonBadgeFill />
  </div>

  <div className="perfil-item-content">

    <label>Apellidos</label>

    {editando ? (
      <input
        type="text"
        value={usuario.apellidos || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            apellidos: e.target.value,
          })
        }
      />
    ) : (
      <span>{usuario.apellidos}</span>
    )}

  </div>

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <PersonBadgeFill />
  </div>

  <div className="perfil-item-content">

    <label>Género</label>

    {editando ? (
      <select
        value={usuario.genero || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            genero: e.target.value,
          })
        }
      >
        <option value="">No especificar</option>
        <option value="femenino">Femenino</option>
        <option value="masculino">Masculino</option>
        <option value="no_binario">No binario</option>
        <option value="otro">Otro</option>
      </select>
    ) : (
      <span>
        {usuario.genero || "No especificado"}
      </span>
    )}

  </div>

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <GeoAltFill />
  </div>

  <div className="perfil-item-content">

    <label>Ciudad</label>

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
              setUsuario({
                ...usuario,
                localidad: e.target.value,
              })
            }
          >
            <option value="">Seleccionar localidad</option>

            {localidadesUruguay[
              usuario.departamento
            ].map((l) => (
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
              setUsuario({
                ...usuario,
                localidadOtro: e.target.value,
              })
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

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <HeartPulseFill />
  </div>

  <div className="perfil-item-content">

    <label>Tipo de discapacidad</label>

    {editando ? (
      <>
        <select
          value={usuario.discapacidad || ""}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              discapacidad: e.target.value,
            })
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

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <TelephoneFill />
  </div>

  <div className="perfil-item-content">

    <label>Teléfono</label>

    {editando ? (
      <input
        type="text"
        value={usuario.telefono || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            telefono: e.target.value,
          })
        }
      />
    ) : (
      <span>{usuario.telefono}</span>
    )}

  </div>

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <TelephoneFill />
  </div>

  <div className="perfil-item-content">

    <label>Contacto de emergencia</label>

    {editando ? (
      <input
        type="text"
        value={usuario.emergencia || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            emergencia: e.target.value,
          })
        }
      />
    ) : (
      <span>{usuario.emergencia}</span>
    )}

  </div>

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <CalendarFill />
  </div>

  <div className="perfil-item-content">

    <label>Fecha de nacimiento</label>

    {editando ? (
      <input
        type="date"
        value={usuario.nacimiento || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            nacimiento: e.target.value,
          })
        }
      />
    ) : (
      <span>{usuario.nacimiento}</span>
    )}

  </div>

</div>

<div className="perfil-item">

  <div className="perfil-item-icon">
    <AwardFill />
  </div>

  <div className="perfil-item-content">

    <label>Objetivo principal</label>

    {editando ? (
      <input
        type="text"
        value={usuario.objetivo || ""}
        onChange={(e) =>
          setUsuario({
            ...usuario,
            objetivo: e.target.value,
          })
        }
      />
    ) : (
      <span>{usuario.objetivo}</span>
    )}

  </div>

</div>

          </div>

        </div>

      </div>

      {mostrarModal && (

        <div
          className="modal fade show"
          style={{ display: "block" }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">

                  ✅ Perfil guardado

                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setMostrarModal(false)
                  }
                ></button>

              </div>

              <div className="modal-body">

                <p>
                  Los datos fueron guardados
                  correctamente.
                </p>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setMostrarModal(false)
                  }
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