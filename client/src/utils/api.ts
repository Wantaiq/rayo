import router from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    const userStore = useUserStore();
    if ([401, 403].indexOf(error.response.status) !== -1) {
      userStore.logout();
      router.push({ name: 'home', replace: true });
    }

    return Promise.reject(error);
  },
);

export default api;
