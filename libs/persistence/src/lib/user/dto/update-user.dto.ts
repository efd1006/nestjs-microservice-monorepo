import { CreateUserRequestDto } from './create-user.dto';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@app/common';
import { User } from '../models';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}

export class UpdateUserResponseDto extends ResponseDto<User> {
  @ApiProperty({ type: User })
  data: User | User[];
}
