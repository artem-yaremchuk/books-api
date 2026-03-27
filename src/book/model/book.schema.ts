import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { BookStatus } from './book-status.enum';

export type BookDocument = HydratedDocument<Book>;

@Schema({ versionKey: false })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  pageCount: number;

  @Prop({ required: true })
  publishedDate: Date;

  @Prop()
  thumbnailUrl?: string;

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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.plugin(paginate);
