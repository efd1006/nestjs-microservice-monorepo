import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { usersMSConfig } from '@app/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  DeleteUserResponseDto,
  FindAllUsersRequestDto,
  FindAllUsersResponseDto,
  FindOneUserResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from '@app/persistence';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
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

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: CreateUserResponseDto })
  @Post()
  async create(
    @Body() dto: CreateUserRequestDto
  ): Promise<CreateUserResponseDto> {
    return await firstValueFrom(
      this.usersMicroservice.send(usersMSConfig.messagePatterns.create, dto)
    );
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: FindAllUsersResponseDto })
  @Get()
  async findAll(
    @Query() req: FindAllUsersRequestDto
  ): Promise<FindAllUsersResponseDto> {
    req.prep();
    return await firstValueFrom(
      this.usersMicroservice.send(usersMSConfig.messagePatterns.findAll, req)
    );
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ type: FindOneUserResponseDto })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<FindOneUserResponseDto> {
    return await firstValueFrom(
      this.usersMicroservice.send(usersMSConfig.messagePatterns.findOne, id)
    );
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ type: UpdateUserResponseDto })
  @Put(':id')
  async update(
    @Body() dto: UpdateUserRequestDto,
    @Param('id') id: string
  ): Promise<UpdateUserResponseDto> {
    return await firstValueFrom(
      this.usersMicroservice.send(usersMSConfig.messagePatterns.update, {
        dto,
        id,
      })
    );
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ type: DeleteUserResponseDto })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    return await firstValueFrom(
      this.usersMicroservice.send(usersMSConfig.messagePatterns.delete, id)
    );
  }
}
