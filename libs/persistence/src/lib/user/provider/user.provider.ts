import { createProvider } from 'libs/persistence/src/helpers';
import { UserEntity } from '../entity/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export const userProvider = createProvider(USER_REPOSITORY, UserEntity);
