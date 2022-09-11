import { IBaseStore } from '../../../interfaces/base-store.interface';

export interface IUserStore<T> extends IBaseStore<T> {}

export const USER_STORE = 'USER_STORE';
