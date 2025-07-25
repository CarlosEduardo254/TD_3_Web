import axios, { type InternalAxiosRequestConfig } from "axios";

// Chave para armazenar o token no localStorage do navegador
export const TOKEN_KEY = "@GestorDeTarefas-Token";

// Função para recuperar o token. O retorno pode ser string ou null.
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json"
  }
});

// Adiciona um "interceptor" que anexa o token de autenticação em todas as requisições
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;