import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { AddBookDTO } from './DTO/book.dto';
import { ArthurService } from './arthur.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
    private arthurSer: ArthurService,
  ) {}

  //   getBooks() : Promise<BookEntity[]> {
  //     return this.bookRepo.find();
  //   }
  getBooks() {
    return this.arthurSer.findAllV2(this.bookRepo);
  }

  addBook(newBook: AddBookDTO) {
    return this.arthurSer.addEntity(newBook, this.bookRepo);
  }

  getBookById(myId) {
    return this.arthurSer.getEntityById(myId, this.bookRepo);
    // Version avec async / await
    //Version avec findOne
    //const b = await this.bookRepo.findOne({ where: { id: myId } });

    //Version avec findOneBy
    // const b = await this.bookRepo.findOneBy({ id: myId });
    // if (!b) throw new NotFoundException("L'id du livre recherché n'existe pas");
    // return b;

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
    return this.arthurSer.updateEntity(uBook, uId, this.bookRepo);
  }

  removeBook(dBook) {
    return this.bookRepo.remove(dBook);
  }

  // deleteBook(selectedYear) {
  //   return this.bookRepo.delete({ year: selectedYear });
  // }

  deleteBook(selectedId) {
    return this.bookRepo.delete({ id: selectedId });
  }

  softDeleteBook(id) {
    return this.bookRepo.softDelete({ id });
  }

  restoreBook(id) {
    return this.bookRepo.restore({ id });
  }

  async softRemoveBook(id) {
    let b = await this.getBookById(id);
    return this.bookRepo.softRemove(b);
  }

  async recoverBook(id) {
    let b = await this.getBookById(id);
    return this.bookRepo.recover({ id: 6 });
  }

  nbBooksPerYear() {
    const qb = this.bookRepo.createQueryBuilder('book');
    return qb
      .select('book.year, count(book.id) as nbDeBooks')
      .groupBy('book.year')
      .getRawMany();

    // console.log(a.getSql());
  }

  nbBooksPerYearV2(yearMin: number, yearMax: number) {
    const qb = this.bookRepo.createQueryBuilder('book');
    return qb
      .select('book.year, count(book.id) as nbDeBooks')
      .where('book.year >= :y1 and book.year <= :y2')
      .setParameters({ y1: yearMin, y2: yearMax })
      .groupBy('book.year')
      .getRawMany();
  }
}
