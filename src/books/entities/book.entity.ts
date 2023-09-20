import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('livre')
export class BookEntity {
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
}
