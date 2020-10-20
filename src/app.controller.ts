import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { downloadFromUrl, ResourceType } from './util/index'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('download')
  async download(@Query('url') url: string, ) {
    await downloadFromUrl(url, ResourceType.other)
    return `下载成功`
  }
}
