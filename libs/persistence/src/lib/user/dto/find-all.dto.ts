import { PaginatedRequestDto, PaginatedResponseDto } from '@app/common';
import { User } from '../models';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindAllUsersRequestDto extends PaginatedRequestDto<Partial<User>> {
  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;
}

export class FindAllUsersResponseDto extends PaginatedResponseDto<User> {
  @ApiProperty({ type: User })
  data: User[];
}
