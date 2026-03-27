import { BookStatus } from '../enums/book-status.enum';

export interface Filter {
  status?: BookStatus;
}
