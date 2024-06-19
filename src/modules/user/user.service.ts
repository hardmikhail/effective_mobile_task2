import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { dataSource } from '../../config/ormconfig';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepositoty: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepositoty.find();
  }
  async updateUserAndCountThem() {
    const responseFromDb = await dataSource
      .createQueryBuilder()
      .update(User)
      .set({ problems: false })
      .where('problems = :problems', { problems: true })
      .execute();
    const countOfUsersChanged = responseFromDb.affected;
    return countOfUsersChanged;
  }
}
