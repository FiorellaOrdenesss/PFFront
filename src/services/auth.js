import api from "../api";
import { getUsuarioById } from "./usuarios";

export async function login(email, password) {
    const res = await api.post("/usuarios/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("usuarioId", res.data.usuario.id);
    return res.data;
}

export async function register(nombre, email, password) {
    const res = await api.post("/usuarios/register", { nombre, email, password });
    return res.data;
}
