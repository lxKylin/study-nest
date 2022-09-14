import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { AuthService } from '@/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  // }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req);
    return req.user;
  }
}
