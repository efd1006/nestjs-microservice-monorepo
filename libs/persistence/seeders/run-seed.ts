import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { Logger } from '@nestjs/common';
import { UsersService } from './users/users.service';

const runSeed = async () => {
  const logger = new Logger(SeederModule.name);
  const app = await NestFactory.create(SeederModule);

  const config = app.get(ConfigService);
  logger.log(`Database connected to: ${process.env.DB_HOST}`);
  logger.log(`Seeding to data to database: ${process.env.DB_NAME}`);

  // execute the run() from the services
  await app.get(UsersService).run();

  await app.close();
};

void runSeed();
