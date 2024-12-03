import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    console.log("here")
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Attempt to auto refresh
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) window.location.href = "/login"

      const result = await axios.get("/auth/refresh", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })

      const newToken = result.data.access_token
      Cookies.set('access_token', newToken, {expires : 1 / 1440});
      console.log(result.data)
      config.headers.Authorization = `Bearer ${newToken}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

