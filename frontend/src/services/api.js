import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

/* =========================
   INTERCEPTOR CORRIGIDO
========================= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@connexa_token");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;