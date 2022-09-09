import { IApplicationConfig } from './interfaces/application-config.interface';

export default (): IApplicationConfig => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  prefix: process.env.PREFIX,
  rmq: {
    connectionURL: process.env.RMQ_CONNECTION_URL,
  },
});
