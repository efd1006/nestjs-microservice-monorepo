import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { IApplicationConfig, IRabbitMQConfig } from '@app/common';
import { usersMSConfig } from '@app/microservices';
import { PersistenceModule } from '@app/persistence';
@Module({
  imports: [
    CommonModule,
    PersistenceModule.forRoot(),
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
  controllers: [UsersService],
})
export class UsersModule {}
