import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { BookEntity } from './book.entity';

@Entity('author')
export class AuthorEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  prenom: string;

  @Column({
    length: 30,
  })
  nom: string;

  //   @OneToMany((type) => BookEntity, (book) => book.title)
  //   listBooks: BookEntity[];
}
