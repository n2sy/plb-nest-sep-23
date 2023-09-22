import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository, Entity } from 'typeorm';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class ArthurService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private authorRepo: Repository<AuthorEntity>,
  ) {}

  findAll(repoName: string) {
    if (repoName == 'book') return this.bookRepo.find();
    else if (repoName == 'author') return this.authorRepo.find();

    return;
  }

  findAllV2(repoTarget) {
    return repoTarget.find();
  }

  async getEntityById(myId, repoName) {
    const b = await repoName.findOneBy({ id: myId });
    if (!b) throw new NotFoundException("L'id recherché n'existe pas");
    return b;
  }

  addEntity(newEntity, repoName) {
    return repoName.save(newEntity);
  }

  async updateEntity(uEntity, uId, repoName) {
    const updatedBook = await repoName.preload({
      id: uId,
      ...uEntity,
    });

    return repoName.save(updatedBook);
  }

  deleteEntity(selectedId, repoName) {
    return repoName.delete({ id: selectedId });
  }
}
