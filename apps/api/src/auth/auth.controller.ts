import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin() {
    // Redirect handled by Passport strategy
    return;
  }

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterCallback(@Req() req: any, @Res() res: Response) {
    const user = req.user as { id: string; username: string };
    const token = await this.authService.generateJwt(user);

    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') ??
      'https://frontend.vercel.app';

    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: any) {
    const userId = req.user.sub as string;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }

  @Post('logout')
  async logout() {
    // JWT is stateless — client should simply delete the token.
    return { success: true };
  }
}

