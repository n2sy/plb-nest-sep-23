import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { AuthorEntity } from '../entities/author.entity';

export class AddBookDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  year: number;

  @IsOptional()
  @IsString()
  editor: string;

  @IsNotEmpty()
  author: AuthorEntity;
}
