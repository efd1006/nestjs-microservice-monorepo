import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max } from 'class-validator';
import { QueryFilter } from '../types';

export const DEFAULT_PAGINATION_LIMIT = 10;
export const MAX_PAGINATION_LIMIT = 20;

export class PaginatedRequestDto<T = {}> {
  filters?: QueryFilter<T>;

  @ApiProperty({ required: false, default: 1, description: 'Current page' })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({
    required: false,
    default: 10,
    description: 'Number of items per page',
  })
  @IsOptional()
  @IsNumber()
  @Max(MAX_PAGINATION_LIMIT)
  limit?: number;

  prep() {
    this.page = this.page - 1 < 0 ? 0 : this.page - 1;
  }
}
