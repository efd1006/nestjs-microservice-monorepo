import { Module, DynamicModule } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { UserEntity, UserStore, USER_STORE } from './user';

export const AllEntity = [UserEntity];

@Module({})
export class PersistenceModule {
  static forRoot(): DynamicModule {
    return {
      module: PersistenceModule,
      providers: [
        ...databaseProviders,
        {
          provide: USER_STORE,
          useClass: UserStore,
        },
      ],
      exports: [...databaseProviders, USER_STORE],
    };
  }
}
