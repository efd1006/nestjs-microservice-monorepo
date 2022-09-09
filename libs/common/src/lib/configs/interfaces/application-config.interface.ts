import { IRabbitMQConfig } from './rabbitmq-config.interface';

export interface IApplicationConfig {
  environment: string;
  port: number;
  prefix: string;
  rmq: IRabbitMQConfig;
}
