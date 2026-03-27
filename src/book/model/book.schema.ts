import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { BookStatus } from '../enums/book-status.enum';

export type BookDocument = HydratedDocument<Book>;

@Schema({ versionKey: false, timestamps: true })
export class Book {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  pageCount: number;

  @Prop({ required: true })
  publishedDate: Date;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  longDescription: string;

  @Prop({
    required: true,
    enum: BookStatus,
  })
  status: BookStatus;

  @Prop({
    required: true,
    type: [String],
  })
  authors: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.plugin(paginate);

BookSchema.index({ status: 1 });
BookSchema.index({ publishedDate: -1 });
BookSchema.index({ status: 1, publishedDate: -1 });
