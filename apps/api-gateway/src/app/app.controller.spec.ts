import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api-gateway!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.ping()).toEqual({
        message: 'Welcome to api-gateway!',
      });
    });
  });
});
