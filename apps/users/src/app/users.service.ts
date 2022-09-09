import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { usersMSConfig } from '@app/microservices';
@Controller()
export class UsersService {
  @MessagePattern(usersMSConfig.messagePatterns.ping)
  async ping() {
    console.log('im here');
    return 'users ping';
  }

  @EventPattern(usersMSConfig.eventPatterns.pong)
  async pong() {
    // doesnt return any response just process the logic
    // execute after 5000ms
    setTimeout(() => {
      console.log('pong');
    }, 5000);
  }
}
