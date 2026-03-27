import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { parse, isValid } from 'date-fns';

export function ToDate() {
  return Transform(({ value }: { value: string }) => {
    if (typeof value !== 'string') return value;

    const date = parse(value, 'dd.MM.yyyy', new Date());

    if (!isValid(date)) {
      throw new BadRequestException('Book published date must be in the format DD.MM.YYYY');
    }

    return date;
  });
}
