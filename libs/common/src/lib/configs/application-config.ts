import { IApplicationConfig } from './interfaces/application-config.interface';

export default (): IApplicationConfig => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  prefix: process.env.PREFIX,
  rmq: {
    connectionURL: process.env.RMQ_CONNECTION_URL,
  },
  persistence: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
});
