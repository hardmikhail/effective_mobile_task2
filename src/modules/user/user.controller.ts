import { Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Patch()
  async updateUser() {
    return await this.userService.updateUserAndCountThem();
  }
}
