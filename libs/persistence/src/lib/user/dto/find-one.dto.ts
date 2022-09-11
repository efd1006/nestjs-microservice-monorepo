import { ResponseDto } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../models/user.model';

export class FindOneUserResponseDto extends ResponseDto<User> {
  @ApiProperty({ type: User })
  data: User | User[];
}
