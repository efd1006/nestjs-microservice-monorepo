import { ResponseDto } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { User } from '../models';

export class CreateUserRequestDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateUserResponseDto extends ResponseDto<User> {
  @ApiProperty({ type: User })
  data: User | User[];
}
