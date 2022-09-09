/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { IApplicationConfig } from '@app/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<IApplicationConfig>);
  const globalPrefix = config.get<string>('prefix');
  const port = config.get<number>('port');
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
