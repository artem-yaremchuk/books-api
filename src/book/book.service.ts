import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { Book, BookDocument } from './model/book.schema';
import { BookQueryDto } from './dto/book-query.dto';
import { Filter } from './interfaces/filter.interface';
import { SortOrder } from './enums/sort-order.enum';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants/pagination.constants';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(@InjectModel(Book.name) private bookModel: PaginateModel<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { title } = createBookDto;

    const existingBook = await this.bookModel
      .findOne({ title: { $eq: title } })
      .lean()
      .exec();

    if (existingBook) {
      this.logger.warn(`Book with title '${title}' already exists`);
      throw new ConflictException('Book with current title already exists');
    }

    const createdBook = await this.bookModel.create(createBookDto);

    this.logger.log(`Book '${title}' (ID: ${createdBook.id}) successfully created`);

    return createdBook.toObject();
  }

  private buildFilter(query: BookQueryDto): Filter {
    const { status } = query;

    const filter: Filter = {};

    if (status) filter.status = status;

    return filter;
  }

  private buildSort(query: BookQueryDto): Record<string, SortOrder> {
    const sort: Record<string, SortOrder> = {};

    if (query.publishedDate) {
      sort.publishedDate = query.publishedDate;
    }

    return sort;
  }

  async findAll(query: BookQueryDto): Promise<{
    books: Book[];
    totalDocs: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = query;

    const filter = this.buildFilter(query);
    const sort = this.buildSort(query);

    const result: PaginateResult<Book> = await this.bookModel.paginate(filter, {
      page,
      limit,
      sort,
      lean: true,
      leanWithId: false,
    });

    if (!result.totalDocs) {
      this.logger.warn(`No books found`);
    }

    return {
      books: result.docs,
      totalDocs: result.totalDocs,
      perPage: result.limit,
      currentPage: result.page ?? page,
      totalPages: result.totalPages,
    };
  }

  async findOne(bookId: string): Promise<Book> {
    const book = await this.bookModel.findById(bookId).lean().exec();

    if (!book) {
      this.logger.error(`Book with ID '${bookId}' not found`);
      throw new NotFoundException('Book not found');
    }

    this.logger.log(`Book with ID '${bookId}' successfully retrieved`);

    return book;
  }

  async update(updateBookDto: UpdateBookDto, bookId: string): Promise<Book> {
    const updatedBook = await this.bookModel
      .findOneAndUpdate(
        { _id: { $eq: bookId } },
        { $set: updateBookDto },
        { lean: true, returnDocument: 'after' },
      )
      .exec();

    if (!updatedBook) {
      this.logger.error(`Book with ID '${bookId}' not found`);
      throw new NotFoundException('Book not found');
    }

    this.logger.log(`Book '${bookId}' successfully updated`);

    return updatedBook;
  }

  async remove(bookId: string): Promise<void> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId).lean().exec();

    if (!deletedBook) {
      this.logger.error(`Book with ID '${bookId}' not found`);
      throw new NotFoundException('Book not found');
    }

    this.logger.log(`Book '${bookId}' successfully deleted`);
  }
}
