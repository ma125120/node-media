import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  timeout: 60 * 1000 * 10,
  baseURL: (process.env.NODE_ENV === `development` ? `/proxy` : ``) + '/api',
});

export const http = {
  get(url, data: any = {}, options?: AxiosRequestConfig) {
    return instance.get(url, {
      params: data,
      ...options,
    });
  },

  post(url, data: any = {}, options?: AxiosRequestConfig) {
    return instance.post(url, {
      params: data,
      ...options,
    });
  },
};
