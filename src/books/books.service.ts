import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { AddBookDTO } from './DTO/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
  ) {}

  //   getBooks() : Promise<BookEntity[]> {
  //     return this.bookRepo.find();
  //   }
  getBooks() {
    return this.bookRepo.find();
  }

  addBook(newBook: AddBookDTO) {
    return this.bookRepo.save(newBook);
  }
}
