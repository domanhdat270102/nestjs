/* eslint-disable */
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { RoleStatus } from './role-status.enum';
import { AuthSignUpCredentialsDto } from './dto/auth-signup.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthSignUpCredentialsDto): Promise<User> {
    const { username, password, role } = authCredentialsDto;

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword, role });
    try {
      await this.save(user);
      return {...user, password: ''};
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
