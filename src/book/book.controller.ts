import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedBookResponse } from './dto/paginated-book-response';
import { BookQueryDto } from './dto/book-query.dto';
import { BookResponse } from './dto/book-response';
import { plainToInstance } from 'class-transformer';
import { ObjectIdValidationPipe } from './pipes/object-id-validation.pipe';

@ApiTags('Book')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Create book' })
  @ApiOkResponse({
    type: BookResponse,
    description: 'Book successfully created',
  })
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponse> {
    const book = await this.bookService.create(createBookDto);

    return plainToInstance(BookResponse, book);
  }

  @ApiOperation({ summary: 'Get all books with optional filters and sorting' })
  @ApiOkResponse({
    type: PaginatedBookResponse,
    description: 'Get all books with optional filters and sorting',
  })
  @ApiNotFoundResponse({ description: 'No books found' })
  @Get()
  async findAll(@Query() query: BookQueryDto): Promise<PaginatedBookResponse> {
    const { books, totalDocs, perPage, currentPage, totalPages } =
      await this.bookService.findAll(query);

    return {
      books: plainToInstance(BookResponse, books),
      totalDocs,
      perPage,
      currentPage,
      totalPages,
    };
  }

  @ApiOperation({ summary: 'Get book by id' })
  @ApiParam({ name: 'id', description: 'Id of the book', example: '65f1c7a4e52891827ad41234' })
  @ApiOkResponse({
    description: 'Book successfully retrieved',
    type: BookResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid book ID' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @Get(':id')
  async findOne(@Param('id', ObjectIdValidationPipe) bookId: string): Promise<BookResponse> {
    const book = await this.bookService.findOne(bookId);

    return plainToInstance(BookResponse, book);
  }

  @ApiOperation({ summary: 'Update book' })
  @ApiParam({ name: 'id', description: 'Id of the book to update' })
  @ApiOkResponse({
    description: 'Book successfully updated',
    type: BookResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid book ID' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @Put(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const updatedBook = await this.bookService.update(updateBookDto, bookId);

    return plainToInstance(BookResponse, updatedBook);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
