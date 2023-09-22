import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { roleEnum } from '../generics/roleEnum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    length: 20,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: roleEnum,
    default: roleEnum.ROLE_USER,
  })
  role: string;
}
