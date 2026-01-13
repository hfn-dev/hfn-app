import axios from 'axios';

// baseURL: "https://birdie-sequestrable-gilda.ngrok-free.dev/api",

const api = axios.create({
  baseURL: "https://temp-hf.onrender.com/api",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  const publicRoutes = ['/account/login', '/account/register'];

  const isPublic = publicRoutes.some((route) => config.url.startsWith(route));

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
