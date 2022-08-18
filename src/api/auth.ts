import { AxiosRequestConfig } from 'axios';
import { LoginCredentials } from '../features/login/types';
import { requestExecutorCreator } from './helpers';
import { API_DEFAULT_REQUEST_HEADERS, BASE_URL, LS_TOKEN_KEY_NAME } from './config';

const requestExecutor = requestExecutorCreator(BASE_URL, API_DEFAULT_REQUEST_HEADERS, false);

interface LoginResponse {
  accessToken: string;
  user: { email: string; id: number };
}

export const login = async (credentials: LoginCredentials): Promise<any> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/login',
    data: credentials,
    method: 'post',
  };

  const response = await requestExecutor<LoginResponse>(axiosRequestConfig);

  localStorage.setItem(LS_TOKEN_KEY_NAME, response.data.accessToken);

  return response.data.user;
};
