import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async endpoint() {}

  @Get()
  async show() {
    return await this.userService.findAll();
  }
}
