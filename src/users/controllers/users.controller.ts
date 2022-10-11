import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './../services/user.services';

@Controller('Users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

}
