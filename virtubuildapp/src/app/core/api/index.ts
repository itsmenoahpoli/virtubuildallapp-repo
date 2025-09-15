import axios, { AxiosInstance } from 'axios';
import { environment } from '@/environments/environment';

const TIMEOUT_MS: number = 3000;

export const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: environment.apiUrl,
    timeout: TIMEOUT_MS,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return client;
};

export const httpClient = createHttpClient();
