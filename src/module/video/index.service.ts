import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { getHttpPath, isExist } from 'src/util';
import { exec } from 'src/util/exec';
import {
  donloadFromUrl,
  getAlias,
  getExecPath,
  isValidMp4,
  isVideo,
  ResourceType,
} from 'src/util/index';

@Injectable()
export class VideoService {
  async getInfo(url: string) {
    await this.validateRes(url);
    const dest = await donloadFromUrl(url, ResourceType.video);
    const res = await exec(
      `ffprobe -of json -show_streams -show_format ${dest}`,
      {
        cwd: getExecPath('ffmpeg'),
      },
    );
    const info = JSON.parse(res.stdout);

    return {
      ...info,
      isValidMp4: isValidMp4(info),
    };
  }

  async format(url: string) {
    await this.validateRes(url);
    const dest = await donloadFromUrl(url, ResourceType.video);
    const newName = getAlias(dest).newName;
    const res = getHttpPath(newName);
    if (isExist(newName)) {
      return res;
    }

    const { stdout } = await exec(
      `ffmpeg -i ${dest} -vcodec libx264 ${newName}`,
      {
        cwd: getExecPath('ffmpeg'),
      },
    );

    return stdout ? res : '';
  }

  async validateRes(url) {
    const { headers } = await axios.head<any>(url, {
      responseType: 'arraybuffer',
    });
    if (!isVideo(headers['content-type'])) {
      throw new HttpException('非法的视频链接', 402);
    }
  }
}
