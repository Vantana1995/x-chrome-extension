import { Controller, Get, Put, Param, Body, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username/interests')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Put('me/interests')
  updateInterests(@Request() req, @Body() body: { categoryIds: string[] }) {
    return this.usersService.updateInterests(req.user.id, body.categoryIds);
  }
}
