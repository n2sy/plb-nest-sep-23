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
  Delete,
  NotFoundException,
  Query,
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

  @Put('edit/:id')
  async updateBookById(
    @Param('id', ParseIntPipe) id,
    @Body() uBook: Partial<AddBookDTO>,
    @Res() res: Response,
  ) {
    const result = await this.bookSer.updateBook(uBook, id);
    return res.status(200).json(result);
  }

  @Delete('remove/:id')
  async removeBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    const bookToDelete = await this.bookSer.getBookById(id);
    if (!bookToDelete)
      throw new NotFoundException("L'id du livre recherché n'existe pas");
    //const bookToDelete2 = await this.bookSer.getBookById(2);
    // let result = await this.bookSer.removeBook([bookToDelete, bookToDelete2]);
    let result = await this.bookSer.removeBook(bookToDelete);
    return res.status(200).json({ messsage: 'Book supprimé avec succès' });
  }

  @Delete('delete')
  async deleteBook(@Query('year', ParseIntPipe) year, @Res() res: Response) {
    let result = await this.bookSer.deleteBook(year);
    return res
      .status(200)
      .json({ messsage: `Book(s) de l'année ${year} supprimé(s) avec succès` });
  }

  @Delete('softdelete/:id')
  async softDeleteBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    let result = await this.bookSer.softDeleteBook(id);
    return res
      .status(200)
      .json({ messsage: `Book(s) supprimé(s) avec succès` });
  }

  @Delete('restore/:id')
  async restoreBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    let result = await this.bookSer.restoreBook(id);
    return res
      .status(200)
      .json({ messsage: `Book(s) restauré(s) avec succès` });
  }

  @Delete('softremove/:id')
  async softRemoveBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    let result = await this.bookSer.softRemoveBook(id);
    return res
      .status(200)
      .json({ messsage: `Book(s) supprimé(s) avec succès` });
  }

  @Delete('recover/:id')
  async recoverBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    let result = await this.bookSer.recoverBook(id);
    return res
      .status(200)
      .json({ messsage: `Book(s) supprimé(s) avec succès` });
  }

  @Get('stat')
  async getBooksYearStat(@Res() res: Response) {
    let result = await this.bookSer.nbBooksPerYear();
    return res.status(200).json(result);
  }

  @Get('statv2')
  async getBooksYearStatV2(
    @Body('year1', ParseIntPipe) y1,
    @Body('year2', ParseIntPipe) y2,
    @Res() res: Response,
  ) {
    let result = await this.bookSer.nbBooksPerYearV2(y1, y2);
    return res.status(200).json(result);
  }

  @Get(':id')
  async getBook(@Param('id') id, @Res() res: Response) {
    const b = await this.bookSer.getBookById(id);
    return res.status(200).json(b);
  }
}
