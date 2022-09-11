import { ApiProperty } from '@nestjs/swagger';
export class ResponseDto<T> {
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  data: T | T[];
  @ApiProperty()
  message?: string;
}
