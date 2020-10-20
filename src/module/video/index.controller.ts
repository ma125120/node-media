import { BadRequestException, Controller, Get, Query, Res } from '@nestjs/common';
import { VideoService } from './index.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { basename, resolve } from 'path';
import { isSafePath } from 'src/util';

@Controller('video')
export class VideoController {
  constructor(private service: VideoService) {}

  @Get('info')
  getInfo(@Query('url') url: string): Promise<any> {
    return this.service.getInfo(url);
  }

  @Get('format')
  format(@Query('url') url: string): Promise<any> {
    return this.service.format(url);
  }

  @Get('download')
  download(@Query('pathname') pathname: string, @Res() res: Response) {
    if (!isSafePath(pathname)) {
      throw new BadRequestException(`非法路径`)
    }
    const file = createReadStream(resolve(pathname));
    res.header(`content-type`, `application/octet-stream`)
    .header(`Content-Disposition`, `attachment;filename=${basename(pathname)}`)
    file.pipe(res)
  }
}
