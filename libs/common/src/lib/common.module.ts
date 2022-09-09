import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './configs/application-config';
import { applicationConfigValidationSchema } from './configs/application-config.validation';
import { getEnvPath } from './configs/env.helper';
const envFilePath: string = getEnvPath(`${__dirname}/environments`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      load: [applicationConfig],
      validationSchema: applicationConfigValidationSchema,
    }),
  ],
  providers: [],
  exports: [],
})
export class CommonModule {}
