import { PaginatedRequestDto, PaginatedResponseDto } from '@app/common';
import { User } from '../models';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllUsersRequestDto extends PaginatedRequestDto {}

export class FindAllUsersResponseDto extends PaginatedResponseDto<User> {
  @ApiProperty({ type: User })
  data: User[];
}
