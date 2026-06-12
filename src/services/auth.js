import api from "../api";

export async function login(email, password) {
    const res = await api.post("/usuarios/login", { email, password });
    localStorage.setItem("token", res.data.token); // guardamos el token
    return res.data;
}

export async function register(nombre, email, password) {
    const res = await api.post("/usuarios/register", { nombre, email, password });
    return res.data;
}
