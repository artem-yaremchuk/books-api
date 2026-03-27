import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../book/model/book.schema';
import { Logger } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

async function bootstrap() {
  const logger = new Logger('SeedBooks');

  const app = await NestFactory.createApplicationContext(AppModule);

  const bookModel = app.get<Model<Book>>(getModelToken(Book.name));

  const filePath = path.join(__dirname, '../data/books.seed.json');

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const books = JSON.parse(rawData) as Book[];

  await bookModel.deleteMany({});

  logger.warn(`Existing books removed`);

  const created = await bookModel.insertMany(books);

  logger.log(`Inserted ${created.length} books`);

  await app.close();
}

void bootstrap();
