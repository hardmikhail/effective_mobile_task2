import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepositoty: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepositoty.find();
  }
}
