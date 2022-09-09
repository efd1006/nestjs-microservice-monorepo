import { Controller, Get, Inject } from '@nestjs/common';
import { usersMSConfig } from '@app/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('v1/users')
export class UsersV1Controller {
  constructor(
    @Inject(usersMSConfig.token) private readonly usersMicroservice: ClientProxy
  ) {}

  @Get('ping')
  async ping() {
    return await firstValueFrom(
      this.usersMicroservice.send(usersMSConfig.messagePatterns.ping, {})
    );
  }

  @Get('pong')
  async pong() {
    // emit publish events without waiting for a response should use emit on @EventPattern()
    this.usersMicroservice.emit(usersMSConfig.eventPatterns.pong, {});

    // need to return something or else http request will stucked waiting for response
    return 'Executing in 5000ms';
  }
}
