import axios from 'axios';
import { BASE_URL, route } from '../../constants';

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosPrivate.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosPrivate.interceptors.response.use(
  async (response) => response,
  (e) => {
    if (e.response.status === 403 || e.response.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.replace(route.LOGIN);
    }
    return Promise.reject(e);
  },
);
