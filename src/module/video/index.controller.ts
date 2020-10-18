import { Controller, Get, Query } from '@nestjs/common';
import { VideoService } from './index.service';

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
}
