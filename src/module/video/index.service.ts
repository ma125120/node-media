import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { getHttpPath, getVideoUpload, isExist, } from 'src/util';
import { exec } from 'src/util/exec';
import {
  getAlias,
  getExecPath,
  isValidMp4,
  isVideo,
} from 'src/util/index';

@Injectable()
export class VideoService {
  async getInfo(url: string) {
    await this.validateRes(url);
    const res = await exec(
      `ffprobe -of json -show_streams -show_format ${url}`,
      {
        cwd: getExecPath('ffmpeg'),
      },
    );
    const info = JSON.parse(res.stdout);

    return {
      ...info,
      isValidMp4: isValidMp4(info),
      codec: info.streams.find(v => v.codec_type === `video`)?.codec_name
    };
  }

  async format(url: string) {
    await this.getInfo(url);
    const newName = getVideoUpload(getAlias(url, '.mp4').newName)
    const res = getHttpPath(newName);
    if (isExist(newName)) {
      return res;
    }

    await exec(
      `ffmpeg -i ${url} -vcodec libx264 ${newName}`,
      {
        cwd: getExecPath('ffmpeg'),
      },
    );

    return res;
  }

  async validateRes(url) {
    const { headers } = await axios.head<any>(url, {
      responseType: 'arraybuffer',
    }).catch(err => {
      throw new BadRequestException(`请求错误, ${err.message}`)
    })
    if (!isVideo(headers['content-type'])) {
      throw new HttpException('非法的视频链接', 402);
    }
  }
}
