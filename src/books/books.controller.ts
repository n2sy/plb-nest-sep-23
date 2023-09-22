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
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Request, Response, Express } from 'express';
import { AddBookDTO } from './DTO/book.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/admin-auth/admin-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('books')
export class BooksController {
  constructor(private readonly bookSer: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllBooks(@Req() req: Request, @Res() res: Response) {
    console.log('USERRRRRR', req['user']);

    const allBooks = await this.bookSer.getBooks();
    return res.status(200).json(allBooks);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Post('add')
  async addNewBook(
    @Body() nBook: AddBookDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.bookSer.addBook(nBook, req['user']['id']);
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

  @Delete('delete/:id')
  async deleteBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    let result = await this.bookSer.deleteBook(id);
    return res
      .status(200)
      .json({ messsage: `Book avec id ${id} supprimé(s) avec succès` });
  }
  // @Delete('delete')
  // async deleteBook(@Query('year', ParseIntPipe) year, @Res() res: Response) {
  //   let result = await this.bookSer.deleteBook(year);
  //   return res
  //     .status(200)
  //     .json({ messsage: `Book(s) de l'année ${year} supprimé(s) avec succès` });
  // }

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

  @Post('upload-v0')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('upload-v1')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadFileV1(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const reponse = {
      orginalname: file.originalname,
      filename: file.filename,
    };
    return res.json(reponse);
  }

  @Post('upload-v2')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName =
            file.originalname.replace(/\s/g, '').substring(0, 3) +
            Date.now() +
            '.' +
            file.mimetype.slice(-3);
          cb(null, randomName);
        },
      }),
    }),
  )
  uploadFileV2(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 200000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const reponse = {
      orginalname: file.originalname,
      filename: file.filename,
    };
    return res.json(reponse);
  }

  @Get('uploads/:filename')
  getFile(@Res() res: Response, @Param('filename') fn: string) {
    res.sendFile(fn, { root: 'uploads/' });
  }

  @Get(':id')
  async getBook(@Param('id') id, @Res() res: Response) {
    const b = await this.bookSer.getBookById(id);
    return res.status(200).json(b);
  }
}
