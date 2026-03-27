import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { parse, isValid } from 'date-fns';

export function ToDate() {
  return Transform(({ value }: { value: string }) => {
    if (typeof value !== 'string') return value;

    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
      throw new BadRequestException('Book published date must be in the format DD.MM.YYYY');
    }

    const date = parse(value, 'dd.MM.yyyy', new Date());

    if (!isValid(date)) {
      throw new BadRequestException('Invalid book published date');
    }

    return date;
  });
}
