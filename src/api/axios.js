import axios from 'axios';

// baseURL: "https://birdie-sequestrable-gilda.ngrok-free.dev/api",

const api = axios.create({
  baseURL: "https://temp-hf.onrender.com/api",
  timeout: 15000,
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

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;



// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   console.log("Retrieved token:", token);

//   const publicRoutes = ["/account/login", "/account/register"];

//   const isPublic = publicRoutes.some((route) => config.url.startsWith(route));

//   if (!isPublic && token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     // If no response or not an auth error, reject quickly
//     if (!err.response) return Promise.reject(err);

//     const status = err.response.status;
//     const data = err.response.data || {};

//     // If token is invalid/expired, try to refresh it once and retry original request
//     if (
//       status === 401 &&
//       (data.code === "token_not_valid" ||
//         data.detail?.toLowerCase?.().includes("token is invalid")) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem("refresh");
//       if (!refreshToken) {
//         // No refresh token available - reject and let caller handle (e.g., redirect to signin)
//         return Promise.reject(err);
//       }

//       try {
//         // Use raw axios (no interceptors) to refresh token
//         console.log("Attempting token refresh", api.defaults.baseURL);
//         const response = await axios.post(
//           `${api.defaults.baseURL}/token/refresh`,
//           {
//             refresh: refreshToken,
//           }
//         );

//         const newAccess = response.data?.access || response.data?.token;
//         if (newAccess) {
//           localStorage.setItem("token", newAccess);

//           // Update Authorization header for the original request and retry
//           originalRequest.headers = originalRequest.headers || {};
//           originalRequest.headers.Authorization = `Bearer ${newAccess}`;

//           return api(originalRequest);
//         }

//         // If refresh did not return a token, clear storage and reject
//         localStorage.removeItem("token");
//         localStorage.removeItem("refresh");
//         return Promise.reject(err);
//       } catch (refreshError) {
//         // Refresh attempt failed - clear storage and propagate error
//         localStorage.removeItem("token");
//         localStorage.removeItem("refresh");
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default api;

