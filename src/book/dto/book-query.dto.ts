import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from '../enums/sort-order.enum';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../constants/pagination.constants';
import { BookStatus } from '../enums/book-status.enum';

export class BookQueryDto {
  @ApiProperty({
    description: 'Page number',
    default: DEFAULT_PAGE,
    example: '1',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty({
    description: 'Books per page',
    default: DEFAULT_LIMIT,
    example: '5',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiProperty({
    description: 'Sort by published date (asc - oldest first, desc - newest first)',
    enum: SortOrder,
    example: SortOrder.Descending,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  publishedDate?: SortOrder;

  @ApiProperty({
    description: 'Filter by status',
    enum: BookStatus,
    example: BookStatus.PUBLISH,
  })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
