import { useEffect, useState } from "react";
import api from "../api";
import "../pages/Perfil.css";
import { PersonCircle } from "react-bootstrap-icons";

function Perfil() {

  const [usuario, setUsuario] = useState({
  nombres: "Yuliana",
  apellidos: "Nuñez",
  email: "yuliana@gmail.com",
  profesion: "Estudiante de Desarrollo Web",
  discapacidad: "",
  pension: "",
  genero: "",
  departamento: "Canelones",
  localidad: "Ciudad de la Costa",
  localidadOtro: ""
});

const localidadesUruguay = {
  Artigas: [
    "Artigas",
    "Bella Unión",
    "Tomás Gomensoro",
    "Baltasar Brum",
    "Otro"
  ],

  Canelones: [
    "Canelones",
    "Las Piedras",
    "Pando",
    "Santa Lucía",
    "Ciudad de la Costa",
    "Atlántida",
    "La Paz",
    "Progreso",
    "Salinas",
    "Otro"
  ],

  "Cerro Largo": [
    "Melo",
    "Río Branco",
    "Fraile Muerto",
    "Aceguá",
    "Otro"
  ],

  Colonia: [
    "Colonia del Sacramento",
    "Carmelo",
    "Nueva Helvecia",
    "Rosario",
    "Juan Lacaze",
    "Otro"
  ],

  Durazno: [
    "Durazno",
    "Sarandí del Yi",
    "Villa del Carmen",
    "Otro"
  ],

  Flores: [
    "Trinidad",
    "Ismael Cortinas",
    "Otro"
  ],

  Florida: [
    "Florida",
    "Sarandí Grande",
    "Casupá",
    "Otro"
  ],

  Lavalleja: [
    "Minas",
    "José Pedro Varela",
    "Solís de Mataojo",
    "Otro"
  ],

  Maldonado: [
    "Maldonado",
    "Punta del Este",
    "San Carlos",
    "Piriápolis",
    "Pan de Azúcar",
    "Otro"
  ],

  Montevideo: [
    "Montevideo",
    "Otro"
  ],

  Paysandú: [
    "Paysandú",
    "Guichón",
    "Quebracho",
    "Otro"
  ],

  "Río Negro": [
    "Fray Bentos",
    "Young",
    "Nuevo Berlín",
    "Otro"
  ],

  Rivera: [
    "Rivera",
    "Tranqueras",
    "Vichadero",
    "Minas de Corrales",
    "Otro"
  ],

  Rocha: [
    "Rocha",
    "Chuy",
    "La Paloma",
    "Castillos",
    "Lascano",
    "Otro"
  ],

  Salto: [
    "Salto",
    "Belén",
    "Constitución",
    "Otro"
  ],

  "San José": [
    "San José de Mayo",
    "Ciudad del Plata",
    "Libertad",
    "Otro"
  ],

  Soriano: [
    "Mercedes",
    "Dolores",
    "Cardona",
    "Otro"
  ],

  Tacuarembó: [
    "Tacuarembó",
    "Paso de los Toros",
    "San Gregorio de Polanco",
    "Otro"
  ],

  "Treinta y Tres": [
    "Treinta y Tres",
    "Vergara",
    "Santa Clara de Olimar",
    "Otro"
  ]
};


  const [editando, setEditando] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/usuarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsuario(res.data[0]);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      }
    }

    fetchPerfil();
  }, []);

  const handleEditarPerfil = () => {
    setEditando(true);
  };

  return (
  <div className="perfil-container">

    <div className="perfil-card">
      <h1 className="perfil-titulo">Mi Perfil</h1>

      <div className="perfil-header">

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

  <h2>{usuario.nombre}</h2>

  <p className="perfil-subtitulo">
    {usuario.profesion}
  </p>

  <p className="perfil-email">
    {usuario.email}
  </p>


        <span className="perfil-rol">
          {usuario.profesion}
        </span>
      </div>

      <div className="perfil-info">

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

  <div className="info-item">
  <strong>Nombres</strong>

  {editando ? (
    <input
      type="text"
      value={usuario.nombres || ""}
      onChange={(e) =>
        setUsuario({
          ...usuario,
          nombres: e.target.value
        })
      }
    />
  ) : (
    <span>{usuario.nombres}</span>
  )}

</div>


<div className="info-item">
  <strong>Apellidos</strong>

  {editando ? (
    <input
      type="text"
      value={usuario.apellidos || ""}
      onChange={(e) =>
        setUsuario({
          ...usuario,
          apellidos: e.target.value
        })
      }
    />
  ) : (
    <span>{usuario.apellidos}</span>
  )}

</div>

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
            localidadOtro: ""
          })
        }
      >
        <option value="">
          Seleccionar departamento
        </option>

        {Object.keys(localidadesUruguay).map((departamento) => (
          <option key={departamento} value={departamento}>
            {departamento}
          </option>
        ))}
      </select>


      {usuario.departamento && (
        <select
          value={usuario.localidad || ""}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              localidad: e.target.value
            })
          }
        >

          <option value="">
            Seleccionar localidad
          </option>

          {localidadesUruguay[usuario.departamento].map((localidad) => (
            <option key={localidad} value={localidad}>
              {localidad}
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
              localidadOtro: e.target.value
            })
          }
        />
      )}

    </>
  ) : (

    <span>
      {usuario.localidad === "Otro"
        ? `${usuario.localidadOtro}, ${usuario.departamento}`
        : `${usuario.localidad || "Montevideo"}, ${usuario.departamento || ""}`}
    </span>

  )}

</div>

  {/* ===== CAMPOS EDITABLES NUEVOS ===== */}

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
        ? usuario.discapacidadOtro || "Otro"
        : usuario.discapacidad || "Visual"}
    </span>
  )}
</div>
<div className="info-item">
  <strong>Pensión</strong>

  {editando ? (
    <select
      value={usuario.pension || ""}
      onChange={(e) =>
        setUsuario({ ...usuario, pension: e.target.value })
      }
    >
      <option value="">Seleccionar</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  ) : (
    <span>
      {usuario.pension === "si"
        ? "Sí"
        : usuario.pension === "no"
        ? "No"
        : "No especificado"}
    </span>
  )}
</div>
  <div className="info-item">
    <strong>Necesidades de apoyo</strong>
    {editando ? (
      <input
        type="text"
        value={usuario.apoyo || ""}
        onChange={(e) =>
          setUsuario({ ...usuario, apoyo: e.target.value })
        }
      />
    ) : (
      <span>{usuario.apoyo || "Lector de pantalla"}</span>
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
      <span>{usuario.telefono || "099 123 456"}</span>
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
      <span>{usuario.emergencia || "María Pérez - 099 888 777"}</span>
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
      <span>{usuario.nacimiento || "15/08/2000"}</span>
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
      <span>{usuario.objetivo || "Acceder a oportunidades laborales"}</span>
    )}
  </div>

</div>

      <button
  className="editar-perfil-btn"
  onClick={() => setEditando(!editando)}
>
  {editando ? "💾 Guardar Cambios" : "✏️ Editar Perfil"}
</button>

    </div>

  </div>
);
}

export default Perfil;
