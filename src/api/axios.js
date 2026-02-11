import router from '@/router';
import { useAuth } from '@/store/authStore';
import axios from 'axios';
// baseURL: "https://birdie-sequestrable-gilda.ngrok-free.dev/api",

const api = axios.create({
  baseURL: 'https://temp-hf.onrender.com/api',
  timeout: 45000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Retrieved token:', token);

  const publicRoutes = ['/account/login', '/account/register'];

  const isPublic = publicRoutes.some((route) => config.url.startsWith(route));

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


let isRedirecting = false;
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;

      const auth = useAuth();
      auth.logout();

      setTimeout(() => {
        router.replace({
          path: '/signin',
          query: { message: 'session-expired' },
        });
        isRedirecting = false;
      }, 50);
    }

    return Promise.reject(err);
  }
);
export default api;
