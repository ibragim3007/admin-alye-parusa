import { API_URL } from './../config/config';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { AuthService } from '../service/auth.service';
import { Inform } from '../service/log/log.service';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export interface IAuthService {
  getToken: () => string;
  setToken: (token: string) => void;
}

class ApiService {
  api: AxiosInstance;
  queryClient: QueryClient;
  authService: IAuthService;
  API_URL: string;

  constructor(apiUrl: string, api: AxiosInstance, queryClient: QueryClient, authService: IAuthService) {
    this.API_URL = apiUrl;
    this.api = api;
    this.queryClient = queryClient;
    this.authService = authService;

    this.setRequestInterceptor();
    this.setResonseInterceptor();
  }

  private setRequestInterceptor() {
    this.api.interceptors.request.use((config) => {
      if (config.baseURL === this.API_URL && !config.headers.Authorization) {
        const token = this.authService.getToken();
        if (token) config.headers.Authorization = token;
      }

      return config;
    });
  }

  private setResonseInterceptor() {
    this.api.interceptors.response.use(
      function (response) {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401 && error.config?.headers.Authorization) {
          Inform.error('Ошибка авторизации');
          this.authService.setToken('');
        }
        return Promise.reject(error);
      }
    );
  }
}

const { api, queryClient, authService } = new ApiService(
  API_URL,
  axiosInstance,
  queryClientInstance,
  new AuthService()
);

export { api, queryClient, authService };
