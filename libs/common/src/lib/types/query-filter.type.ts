export type QueryFilter<T> = {
  [P in keyof T]: T[any];
};
