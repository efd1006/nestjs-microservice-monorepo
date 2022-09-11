import { DataSource, EntityTarget } from 'typeorm';
import { DATA_SOURCE } from '../lib/typeorm.provider';

export function createProvider<T, U>(
  repositoryToken: string,
  entity: EntityTarget<T>
) {
  return {
    provide: repositoryToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
    inject: [DATA_SOURCE],
  };
}
