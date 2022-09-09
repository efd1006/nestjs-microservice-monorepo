import { IUsersEventPattern } from '../interfaces/event-patterns';
import { IUsersMessagePattern } from '../interfaces/message-patterns';
import { IMicroserviceWithFullConfig } from '../interfaces/microservice-config.interface';

export const usersMSConfig: IMicroserviceWithFullConfig<
  IUsersMessagePattern,
  IUsersEventPattern
> = {
  token: 'USERS_MICROSERVICE_TOKEN',
  queue: 'USERS_MICROSERVICE_QUEUE',
  messagePatterns: {
    ping: 'USERS:ping',
  },
  eventPatterns: {
    pong: 'USERS:pong',
  },
};
