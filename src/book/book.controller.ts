import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginatedBookResponse } from './dto/paginated-book-response';
import { BookQueryDto } from './dto/book-query.dto';
import { BookResponse } from './dto/book-response';
import { plainToInstance } from 'class-transformer';

@ApiTags('Book')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
