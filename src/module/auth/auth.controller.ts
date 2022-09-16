import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body
} from '@nestjs/common';
// passport内置守卫
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '@/module/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '@/module/auth/guards/jwt-auth.guard';
import { AuthService } from '@/module/auth/auth.service';
import { CreateUserDto } from '@/module/user/dto/create-user.dto';

@ApiTags('授权模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  // }
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: CreateUserDto })
  @Post('login')
  @ApiOperation({
    summary: '登录' // 接口描述信息
  })
  async login(@Body() loginBody: CreateUserDto) {
    return await this.authService.login(loginBody);
  }
  // async login(@Request() req) {
  //   // console.log('login', req); // 缺密码
  //   return await this.authService.login(req.user);
  // }

  @UseGuards(JwtAuthGuard) // 验证token
  // @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req);
    return req.user;
  }
}
