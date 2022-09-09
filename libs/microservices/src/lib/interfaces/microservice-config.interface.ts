export interface IBaseMicroserviceConfig {
  token: string;
  queue: string;
}

export interface IMicroserviceWithMessagePatternConfig<T>
  extends IBaseMicroserviceConfig {
  messagePatterns: T;
}

export interface IMicroserviceWithEventPatternConfig<T>
  extends IBaseMicroserviceConfig {
  eventPatterns: T;
}

// With MessagePattern and EventPattern
export interface IMicroserviceWithFullConfig<T, U>
  extends IBaseMicroserviceConfig {
  messagePatterns: T;
  eventPatterns: U;
}
