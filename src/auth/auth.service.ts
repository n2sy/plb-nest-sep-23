import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { roleEnum } from './generics/roleEnum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async signUp(credentials) {
    //const { email, username } = credentials;
    const newUser = this.userRepo.create({
      email: credentials.email,
      username: credentials.username,
      salt: await bcrypt.genSalt(),
      role: roleEnum.ROLE_USER,
    });
    newUser.password = await bcrypt.hash(credentials.password, newUser.salt);
    try {
      const result = await this.userRepo.save(newUser);
      return result;
    } catch (e) {
      throw new ConflictException('Username OR email existing');
    }
  }

  async signIn(credentials) {
    const { login, pwd } = credentials; // le login peut etre soit un username soit un email, nous on le sait pas !

    const qb = await this.userRepo.createQueryBuilder('user');

    const u = await qb
      .select('user')
      .where('user.username = :identifiant or user.email = :identifiant')
      .setParameters({ identifiant: login })
      .getOne();

    console.log(u);

    if (!u) throw new NotFoundException('Username OR email not existing');
    else {
      const comparaison = await bcrypt.compare(pwd, u.password);
      if (comparaison) {
        return {
          identifiant: login,
          role: u.role,
          access_token: 'tokengénéré',
        };
      } else throw new NotFoundException('Wrong Password');
    }
  }
}
