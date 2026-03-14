import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateInterestsDto } from './dto/update-interests.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username/interests')
  @Header('Cache-Control', 'public, max-age=300')
  @Throttle({ default: { ttl: 60_000, limit: 300 } })
  async getInterests(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Put('me/interests')
  @UseGuards(JwtAuthGuard)
  async updateMyInterests(
    @Req() req: any,
    @Body() body: UpdateInterestsDto,
  ): Promise<void> {
    const userId = req.user.sub as string;
    await this.usersService.updateCurrentUserInterests(
      userId,
      body.categoryIds,
    );
  }
}

