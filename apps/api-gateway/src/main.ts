/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { IApplicationConfig } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const VERSION = process.env.npm_package_version || '1.0';
export const NAME = process.env.npm_package_name || 'api-bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<IApplicationConfig>);
  const globalPrefix = config.get<string>('prefix');
  const port = config.get<number>('port');
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${NAME.toLocaleUpperCase()} Documentation`)
    .setDescription('')
    .setVersion(VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: true,
        value: true,
      },
      disableErrorMessages: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
