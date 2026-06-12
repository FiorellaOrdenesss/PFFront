// src/services/categorias.js
import api from "../api";

// Obtener todas las categorías
export async function getCategorias(token) {
    const res = await api.get("/categorias", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Obtener categoría por ID
export async function getCategoriaById(id, token) {
    const res = await api.get(`/categorias/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Crear categoría
export async function createCategoria(data, token) {
    const res = await api.post("/categorias", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Actualizar categoría
export async function updateCategoria(id, data, token) {
    const res = await api.put(`/categorias/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

// Eliminar categoría
export async function deleteCategoria(id, token) {
    const res = await api.delete(`/categorias/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}
