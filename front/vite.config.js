import { resolve } from 'path';
import dotenv from 'dotenv';
import { networkInterfaces } from 'os';

dotenv.config({ path: resolve(__dirname, `../.env`) });

// const PORT = process.env.PORT

export const getLocalHttp = () => {
  const list = networkInterfaces();
  let url = '';
  for (const key in list) {
    list[key].forEach(v => {
      if (v.family === 'IPv4' && !v.address.startsWith(`127`)) {
        url = v.address;
      }
    });
  }

  return `http://` + url + `:${process.env.PORT}`;
};

export default {
  proxy: {
    '/proxy': {
      target: getLocalHttp(),
      changeOrigin: true,
      rewrite: path => path.replace(/^\/proxy/, ''),
    },
  },
};
