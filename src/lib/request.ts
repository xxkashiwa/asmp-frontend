import useAuthStore from '@/stores/auth-store';
import axios, { AxiosRequestConfig } from 'axios';

// 设置API基础URL
// 在生产和开发环境中都使用相对路径
// 本地开发, vite.config.ts中配置了代理
const API_BASE_URL = '/api';

export default (config: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
  });
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401 || error.response.status === 403) {
        useAuthStore.getState().setAccessToken(null);
        useAuthStore.getState().setIsAuthenticated(false);
      }
      return Promise.reject(error.response.data.detail!);
    }
  );
  return instance(config);
};
