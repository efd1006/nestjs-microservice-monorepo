/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IApplicationConfig, IRabbitMQConfig } from '@app/common';
import { useContainer } from 'class-validator';

import { usersMSConfig } from '@dev.edmardiaz/microservices';
import { UsersModule } from './app/users.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UsersModule);
  const config = await appContext.get(ConfigService<IApplicationConfig>);

  const { connectionURL } = config.get<IRabbitMQConfig>('rmq');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      bufferLogs: true,
      transport: Transport.RMQ,
      options: {
        urls: [connectionURL],
        queue: usersMSConfig.queue,
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  useContainer(app.select(UsersModule), { fallbackOnErrors: true });

  await app.listen();
}

bootstrap();
