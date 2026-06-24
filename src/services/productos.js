import api from "../api";

export async function getProductos(token) {
    const res = await api.get("/producto", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

export async function createProducto(data, token) {
    const res = await api.post("/producto", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

export async function updateProducto(id, data, token) {
    const res = await api.put(`/producto/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

export async function deleteProducto(id, token) {
    const res = await api.delete(`/producto/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}