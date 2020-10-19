import { http } from '../util';

export const video = {
  info(params = {}) {
    return http.get(`/video/info`, params);
  },
  format(params = {}) {
    return http.get(`/video/format`, params);
  },
};
