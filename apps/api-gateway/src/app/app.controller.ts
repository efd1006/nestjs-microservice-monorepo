import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  ping() {
    return 'Welcome to api-gateway!';
  }
}
