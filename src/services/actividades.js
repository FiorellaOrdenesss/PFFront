import api from "../api";

// Obtener todas las actividades
export async function getActividades(token) {
    const res = await api.get("/actividades", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Obtener actividad por ID
export async function getActividadById(id, token) {
    const res = await api.get(`/actividades/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Crear actividad
export async function createActividad(data, token) {
    const res = await api.post("/actividades", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Actualizar actividad
export async function updateActividad(id, data, token) {
    const res = await api.put(`/actividades/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Eliminar actividad
export async function deleteActividad(id, token) {
    const res = await api.delete(`/actividades/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}
