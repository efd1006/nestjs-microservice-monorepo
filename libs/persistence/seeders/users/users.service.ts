import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'libs/persistence/src/lib/user';
import { Repository } from 'typeorm';
import { ISeederService } from '../interfaces/seeder-service.interface';

@Injectable()
export class UsersService implements ISeederService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async run(): Promise<void> {
    const users = [
      {
        name: 'Juan',
        email: 'juan@mail.com',
      },
      {
        name: 'Pepe',
        email: 'pepe@mail.com',
      },
    ];

    await this.userRepository.save(users, { chunk: 100 });
  }
}
