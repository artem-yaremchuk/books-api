import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsEnum,
  IsArray,
  IsDate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BookStatus } from '../enums/book-status.enum';
import { ToDate } from '../transformers/to-date.transform';

export class CreateBookDto {
  @ApiProperty({ required: true, example: 'Unlocking Android' })
  @Transform(({ value }: { value: string }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 416 })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pageCount: number;

  @ApiProperty({ example: '01.04.2009' })
  @ToDate()
  @IsNotEmpty()
  @IsDate()
  publishedDate: Date;

  @ApiProperty({
    example: 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg',
  })
  @IsNotEmpty()
  @IsString()
  thumbnailUrl: string;

  @ApiProperty({ example: "Unlocking Android: A Developer's Guide." })
  @Transform(({ value }: { value: string }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  shortDescription: string;

  @ApiProperty({
    example: 'Android is an open source mobile phone platform based on the Linux kernel.',
  })
  @Transform(({ value }: { value: string }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  longDescription: string;

  @ApiProperty({ enum: BookStatus, example: BookStatus.PUBLISH })
  @IsEnum(BookStatus)
  status: BookStatus;

  @ApiProperty({ example: ['W. Frank Ableson', 'Charlie Collins', 'Robi Sen'] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  authors: string[];
}
