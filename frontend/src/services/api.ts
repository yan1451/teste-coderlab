import  axios from "axios";

// Configuração do Axios
// Cria uma instância configurada
export const api = axios.create({
  baseURL: 'http://localhost:3333', // URL base da API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
