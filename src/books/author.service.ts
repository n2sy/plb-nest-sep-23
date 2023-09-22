import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { Repository } from 'typeorm';
import { ArthurService } from './arthur.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepo: Repository<AuthorEntity>,
    private readonly arthurSer: ArthurService,
  ) {}

  getAuthors() {
    return this.arthurSer.findAllV2(this.authorRepo);
  }

  getAuthorById(id) {
    return this.arthurSer.getEntityById(id, this.authorRepo);
  }

  addAuthor(newAuthor) {
    return this.arthurSer.addEntity(newAuthor, this.authorRepo);
  }

  updateAuthor(uAuthor, aId) {
    return this.arthurSer.updateEntity(uAuthor, aId, this.authorRepo);
  }

  deleteAuthor(authorId) {
    //traitement pour supprimer d'abord tous les livres écrits par l'auteur ayant l'id authorId
    return this.arthurSer.deleteEntity(authorId, this.authorRepo);
  }
}
