import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '../enums/book-status.enum';

export class BookResponse {
  @ApiProperty({ example: '65f1c7a4e52891827ad41234' })
  _id: string;

  @ApiProperty({ example: 'Unlocking Android' })
  title: string;

  @ApiProperty({ example: 416 })
  pageCount: number;

  @ApiProperty({ example: '2009-04-01T00:00:00.000Z' })
  publishedDate: Date;

  @ApiProperty({
    example: 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg',
  })
  thumbnailUrl?: string;

  @ApiProperty({ example: "Unlocking Android: A Developer's Guide." })
  shortDescription: string;

  @ApiProperty({
    example: 'Android is an open source mobile phone platform based on the Linux kernel.',
  })
  longDescription: string;

  @ApiProperty({ example: BookStatus.PUBLISH })
  status: BookStatus;

  @ApiProperty({ example: ['W. Frank Ableson', 'Charlie Collins', 'Robi Sen'] })
  authors: string[];

  @ApiProperty({ example: '2026-03-27T16:16:43.246+00:00' })
  createdAt: Date;

  @ApiProperty({ example: '2026-03-27T16:16:43.246+00:00' })
  updatedAt: Date;
}
