import { Module } from '@nestjs/common';
import { UsersV1Controller } from './v1/users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { usersMSConfig } from '@app/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IApplicationConfig, IRabbitMQConfig } from '@app/common';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: usersMSConfig.token,
        useFactory: (config: ConfigService<IApplicationConfig>) => {
          const { connectionURL } = config.get<IRabbitMQConfig>('rmq');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [connectionURL],
              queue: usersMSConfig.queue,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [UsersV1Controller],
})
export class UsersModule {}
