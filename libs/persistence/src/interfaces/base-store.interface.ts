export interface IBaseStore<T> {
  findAll(filters: any, limit: number, page: number): Promise<[T[], number]>;
  findOne(id: string): Promise<T>;
  create(doc: T): Promise<T>;
  update(id: string, doc: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
