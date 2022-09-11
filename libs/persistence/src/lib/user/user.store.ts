import { DEFAULT_PAGINATION_LIMIT, QueryFilter } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { IUserStore } from './interfaces/user.store.interface';
import { User } from './models/user.model';
import { USER_REPOSITORY } from './provider/user.provider';

export class UserSerializer {
  toUser(ent: UserEntity): User {
    const user = new User();
    user.id = ent.id;
    user.name = ent.name;
    user.email = ent.email;
    return user;
  }
}

@Injectable()
export class UserStore implements IUserStore<User> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(
    filters: QueryFilter<Partial<User>>,
    limit: number,
    page: number
  ): Promise<[User[], number]> {
    // override object property if we need to use TypeOrm FindOperator
    filters = {
      ...filters,
      ...(filters.email && { email: ILike(`%${filters.email}%`) }),
      ...(filters.name && { name: ILike(`%${filters.name}%`) }),
    };

    const [res, count] = await this.userRepository.findAndCount({
      skip: page * (limit || DEFAULT_PAGINATION_LIMIT),
      take: limit,
      where: filters,
    });

    const serializer = new UserSerializer();
    const users = res.map<User>((r) => {
      return serializer.toUser(r);
    });
    return [users, count];
  }

  async findById(id: string): Promise<User> {
    const res = await this.userRepository.findOneOrFail({ where: { id } });

    const serializer = new UserSerializer();
    const user = serializer.toUser(res);
    return user;
  }

  async create(doc: User): Promise<User> {
    const user = await this.userRepository.create({
      name: doc.name,
      email: doc.email,
    });

    await this.userRepository.save(user);

    return doc;
  }

  async update(id: string, doc: User): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    await this.userRepository.merge(user, doc);
    await this.userRepository.save(user);

    return user;
  }

  async delete(id: string): Promise<boolean> {
    await this.userRepository.delete(id);

    return true;
  }
}
