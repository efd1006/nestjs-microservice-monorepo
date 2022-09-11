import { IPersistenceConfig } from './persistence-config.interface';
import { IRabbitMQConfig } from './rabbitmq-config.interface';

export interface IApplicationConfig {
  environment: string;
  port: number;
  prefix: string;
  rmq: IRabbitMQConfig;
  persistence: IPersistenceConfig;
}
