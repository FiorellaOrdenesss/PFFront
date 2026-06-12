import api from "../api";

export async function getBeneficios(token) {
    const res = await api.get("/beneficios", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

export async function createBeneficio(data, token) {
    const res = await api.post("/beneficios", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

export async function updateBeneficio(id, data, token) {
    const res = await api.put(`/beneficios/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

export async function deleteBeneficio(id, token) {
    const res = await api.delete(`/beneficios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}
