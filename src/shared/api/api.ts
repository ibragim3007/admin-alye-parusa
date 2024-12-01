import { API_URL } from './../config/config';
import axios, { AxiosInstance } from 'axios';
import { QueryClient } from '@tanstack/react-query';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const queryClientInstance = new QueryClient();

// export interface IAuthService {

// }

class ApiService {
  api: AxiosInstance;
  queryClient: QueryClient;
  API_URL: string;

  constructor(apiUrl: string, api: AxiosInstance, queryClient: QueryClient) {
    this.API_URL = apiUrl;
    this.api = api;
    this.queryClient = queryClient;
  }
}

const { api, queryClient } = new ApiService(API_URL, axiosInstance, queryClientInstance);

export { api, queryClient };
