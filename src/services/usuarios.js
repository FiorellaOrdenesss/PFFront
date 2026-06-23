import api from "../api";

// Obtener todos los usuarios
export async function getUsuarios(token) {
    const res = await api.get("/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Obtener usuario por ID
export async function getUsuarioById(id, token) {
    const res = await api.get(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Registrar usuario
export async function registerUsuario(data) {
    const res = await api.post("/usuarios/register", data);
    return res.data;
}

// Login usuario
export async function loginUsuario(data) {
    const res = await api.post("/usuarios/login", data);
    return res.data;
}

// Actualizar usuario
export async function updateUsuario(id, data, token) {
    const res = await api.put(`/usuarios/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Eliminar usuario
export async function deleteUsuario(id, token) {
    const res = await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}
