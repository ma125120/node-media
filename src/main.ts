import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter';
import { HttpInterceptor } from './common/interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalInterceptors(new HttpInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix(`api`);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  console.log(`启动于${PORT}`);
  await app.listen(PORT);
}
bootstrap();
