import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { AuthorEntity } from './author.entity';

@Entity('livre')
export class BookEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column({name : 'intitule', length : 50, unique : true, readonly : true, update : false})
  @Column({
    length: 30,
  })
  title: string;

  @Column()
  year: number;

  @Column()
  editor: string;

  @ManyToOne((type) => AuthorEntity, (author) => author.id)
  author: AuthorEntity;
}
