import { typeormProvider } from './typeorm.provider';
import { userProvider } from './user';

export const databaseProviders = [typeormProvider, userProvider];
