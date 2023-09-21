import {
  Controller,
  Req,
  Res,
  Body,
  Post,
  Get,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Request, Response } from 'express';
import { AddBookDTO } from './DTO/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookSer: BooksService) {}

  @Get('all')
  async getAllBooks(@Res() res: Response) {
    const allBooks = await this.bookSer.getBooks();
    return res.status(200).json(allBooks);
  }

  @Post('add')
  async addNewBook(@Body() nBook: AddBookDTO, @Res() res: Response) {
    const result = await this.bookSer.addBook(nBook);
    return res.status(200).json({ id: result.id, createdAt: result.createdAt });
  }

  @Get(':id')
  async getBook(@Param('id') id, @Res() res: Response) {
    const b = await this.bookSer.getBookById(id);
    return res.status(200).json(b);
  }

  @Put('edit/:id')
  async updateBookById(
    @Param('id', ParseIntPipe) id,
    @Body() uBook: Partial<AddBookDTO>,
    @Res() res: Response,
  ) {
    const result = await this.bookSer.updateBook(uBook, id);
    return res.status(200).json(result);
  }
}
