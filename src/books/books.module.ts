import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorEntity } from './entities/author.entity';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { ArthurService } from './arthur.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [BooksController, AuthorController],
  providers: [BooksService, AuthorService, ArthurService],
})
export class BooksModule {}
