import { Injectable, NotFoundException } from '@nestjs/common';
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
    this.bookRepo.create();
    return this.bookRepo.save(newBook);
  }

  async getBookById(myId) {
    // Version avec async / await
    //Version avec findOne
    //const b = await this.bookRepo.findOne({ where: { id: myId } });

    //Version avec findOneBy
    const b = await this.bookRepo.findOneBy({ id: myId });
    if (!b) throw new NotFoundException("L'id du livre recherché n'existe pas");
    return b;

    // Version avec les Promise
    // this.bookRepo.findOne(id).then(
    //     (result) => {
    //         return result
    //     }
    // ).catch(err => {
    //     throw new NotFoundException(err)
    // })
  }

  async updateBook(uBook: Partial<AddBookDTO>, uId) {
    console.log(uBook);

    // Preload retourne indefined si elle trouve pas l'entité cible dans la BD
    const updatedBook = await this.bookRepo.preload({
      id: uId,
      ...uBook,
    });
    console.log('updated book', updatedBook);

    return this.bookRepo.save(updatedBook);
  }

  removeBook(dBook) {
    return this.bookRepo.remove(dBook);
  }

  deleteBook(selectedYear) {
    return this.bookRepo.delete({ year: selectedYear });
  }

  softDeleteBook(id) {
    return this.bookRepo.softDelete({ id });
  }

  restoreBook(id) {
    return this.bookRepo.restore({ id });
  }
}
