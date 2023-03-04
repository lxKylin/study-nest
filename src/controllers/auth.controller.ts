import {
  Controller,
  // Get,
  // Request,
  Post,
  UseGuards,
  Body
} from '@nestjs/common';
// passport内置守卫
// import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
// import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { AuthService } from '@/services/auth.service';
import { LoginUserDto } from '@/dto/user/Login-user.dto';

import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('授权模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard) // 启用本地身份验证
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({
    summary: '登录'
  })
  async login(@Body() loginBody: LoginUserDto) {
    console.log('2-请求登陆', loginBody);
    try {
      return await this.authService.login(loginBody);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '登录失败'
      });
    }
  }
}
