import { Module } from '@nestjs/common';
import { VideoController } from './index.controller';
import { VideoService } from './index.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
