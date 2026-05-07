import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // URL do nosso backend NestJS
});

// Interceptor para injetar o JWT em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sge_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
