import {
  Controller,
  Res,
  Get,
  ParseIntPipe,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { Response } from 'express';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorSer: AuthorService) {}

  @Get('all')
  async getAllAuthors(@Res() res: Response) {
    const result = await this.authorSer.getAuthors();
    res.json(result);
  }

  @Get(':id')
  async getAuthor(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    const result = await this.authorSer.getAuthorById(id);
    res.json(result);
  }

  @Post('new')
  async addAuthor(@Body() nAuthor, @Res() res: Response) {
    const result = await this.authorSer.addAuthor(nAuthor);
    res.json(result);
  }

  @Put('edit/:id')
  async modifierAuthor(
    @Body() nAuthor,
    @Param('id', ParseIntPipe) id,
    @Res() res: Response,
  ) {
    const result = await this.authorSer.updateAuthor(nAuthor, id);
    res.json(result);
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    let result = await this.authorSer.deleteAuthor(id);
    return res
      .status(200)
      .json({ messsage: `Author avec id ${id} supprimé avec succès` });
  }
}
