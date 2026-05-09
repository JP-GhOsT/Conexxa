import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;

// funções separadas (opcional)
export const cadastrarUsuario = async (dados) => {
  try {
    const response = await api.post("/usuarios/cadastro", dados);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro inesperado" };
  }
};