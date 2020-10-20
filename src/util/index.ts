import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import { resolve } from 'path';
import axios from 'axios';
import { networkInterfaces } from 'os';

const ROOT = path.resolve(__dirname, `../../`);
const PUBLIC_ROOT = path.resolve(ROOT, `public`);
export const relative = name => path.relative(PUBLIC_ROOT, name);
export const getHttpPath = name => {
  const pathname = relative(name).replace(/\\/g, '/');

  return getLocalHttp() + `/` + pathname;
};

const { promisify } = util;
export const isExist = name => fs.existsSync(name);
export const mkdir = (path, options) =>
  promisify(fs.mkdir)(path, { ...(options || {}), recursive: true });

export const getPath = (...args) =>
  resolve(__dirname, '../../', 'public', ...args);

export const getUpload = (name, ...args) => {
  const dest = getPath(`upload/${name}`, ...args)
  mkdir(path.dirname(dest), {}).catch(err => err);
  return dest
};
export const getVideoUpload = name => getUpload(`video/${name}`);

export const getExecPath = name => {
  const execPath = process.env.PATH.split(';').find(v => v.includes(name));
  if (!execPath) {
    throw new Error(`${name}的环境变量未发现，请先进行添加`);
  }

  return execPath;
};

export const getAlias = (name, alias = '') => {
  const extname = path.extname(name);
  const basename = path.basename(name, extname);

  return {
    newName:  `${basename}_1${alias || ''}`, //path.resolve(path.dirname(name), `${basename}_1${alias || ''}`),
    extname,
    basename,
    filename: basename + extname,
  };
};

export const isVideo = (contentType: string) => contentType.startsWith(`video`);

export const writeFile = (blob: ArrayBuffer, name: string) =>
  new Promise(async (resolve, reject) => {
    const dir = path.dirname(name);
    await mkdir(dir, {}).catch(err => err);
    if (isExist(name)) {
      resolve();
      return;
    }

    const writer = fs.createWriteStream(name, {});
    writer.write(blob, err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });

export enum ResourceType {
  video = 1,
  img = 2,
  other = 3,
}
export const uploadDirObj = {
  [ResourceType.img]: `img`,
  [ResourceType.video]: `video`,
  [ResourceType.other]: `other`,
};

export const downloadFromUrl = async (url: string, type = ResourceType.img) => {
  const { data } = await axios.get<any>(url, { responseType: 'arraybuffer' });
  const dest = getUpload(uploadDirObj[type], getAlias(url).filename);
  await writeFile(data, dest);
  return dest;
};

export const isValidMp4 = info =>
  info?.streams.some(v => v.codec_type === `video` && v.codec_name === `h264`);

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

export const isSafePath = name => name.startsWith(ROOT)