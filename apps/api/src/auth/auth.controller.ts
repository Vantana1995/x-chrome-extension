import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  twitterAuth() {}

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  twitterCallback(@Req() req, @Res() res) {
    const token = this.authService.login(req.user);
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}`,
    );
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req) {
    return req.user;
  }
}
