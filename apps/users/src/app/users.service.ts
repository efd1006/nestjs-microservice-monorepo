import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { usersMSConfig } from '@app/microservices';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  DeleteUserResponseDto,
  FindAllUsersRequestDto,
  FindAllUsersResponseDto,
  FindOneUserResponseDto,
  IUserStore,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  User,
  USER_STORE,
} from '@app/persistence';
import { getPaginationMeta, PaginatedRequestDto } from '@app/common';

@Controller()
export class UsersService {
  constructor(
    @Inject(USER_STORE) private readonly userStore: IUserStore<User>
  ) {}

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

  @MessagePattern(usersMSConfig.messagePatterns.findOne)
  async findOne(@Payload() req: string): Promise<FindOneUserResponseDto> {
    const user = await this.userStore.findOne(req);
    return {
      status: true,
      data: user,
    };
  }

  @MessagePattern(usersMSConfig.messagePatterns.findAll)
  async findAll(
    @Payload() req: FindAllUsersRequestDto
  ): Promise<FindAllUsersResponseDto> {
    // prepare filters if theres any
    req.filters = {
      ...(req.email && { email: req.email }),
      ...(req.name && { name: req.name }),
    };

    const [users, count] = await this.userStore.findAll(
      req.filters,
      req.limit,
      req.page
    );
    return {
      data: users,
      meta: getPaginationMeta(req.page, req.limit, count),
    };
  }

  @MessagePattern(usersMSConfig.messagePatterns.create)
  async create(
    @Payload() req: CreateUserRequestDto
  ): Promise<CreateUserResponseDto> {
    const user = await this.userStore.create({
      name: req.name,
      email: req.email,
    });

    return {
      status: true,
      data: user,
    };
  }

  @MessagePattern(usersMSConfig.messagePatterns.update)
  async update(
    @Payload() req: { dto: UpdateUserRequestDto; id: string }
  ): Promise<UpdateUserResponseDto> {
    const user = await this.userStore.update(req.id, req.dto);

    return {
      status: true,
      data: user,
    };
  }

  @MessagePattern(usersMSConfig.messagePatterns.delete)
  async delete(@Payload() id: string): Promise<DeleteUserResponseDto> {
    const deleted = await this.userStore.delete(id);

    return {
      status: deleted,
      data: null,
      message: 'Deleted successfully',
    };
  }
}
