import { IApplicationConfig, IPersistenceConfig } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AllEntity } from './persistence.module';
export const DATA_SOURCE = 'DATA_SOURCE';

export const typeormProvider = {
  import: [ConfigModule],
  inject: [ConfigService],
  provide: DATA_SOURCE,
  useFactory: async (configService: ConfigService<IApplicationConfig>) => {
    const { host, port, dbName, user, password } =
      configService.get<IPersistenceConfig>('persistence');
    const dataSource = new DataSource({
      type: 'postgres',
      host: host,
      port: port,
      username: user,
      password: password,
      database: dbName,
      entities: AllEntity,
      synchronize: false,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    });
    return dataSource.initialize();
  },
};
