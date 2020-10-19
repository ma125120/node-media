import axios, { AxiosRequestConfig } from 'axios';
import Message from '../components/message'

const instance = axios.create({
  timeout: 60 * 1000 * 10,
  baseURL: (process.env.NODE_ENV === `development` ? `/proxy` : ``) + '/api',
});

instance.interceptors.response.use(function (response) {
  if (response.data.errcode !== '0') {
    Message.error({ message: response.data.msg })
  }
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
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
