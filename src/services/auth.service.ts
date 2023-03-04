import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '@/services/user.service';
import { md5password } from '@/utils/password-handle';
import { BusinessException } from '@/common/exceptions/business.exception';
import { LoginUserDto } from '@/dto/user/login-user.dto';
import { User } from '@/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: { roles: true }
    });
  }

  // 验证用户是否存在
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);
    if (user && user.password === md5password(password)) {
      return user;
    }
    throw new BusinessException('用户名或密码错误');
  }

  async checkLogin(loginBody: LoginUserDto) {
    const { username, password } = loginBody;
    const user = await this.userRepository.findOne({
      where: { username },
      relations: { roles: true }
    });
    // if (!user) {
    //   throw new BusinessException('用户名或密码错误');
    // }
    if (user && user.password === md5password(password)) {
      // const { password, ...result } = user;
      return user;
    }
    throw new BusinessException('用户名或密码错误');
  }

  // 处理jwt签证
  async login(user: any) {
    console.log('3-处理jwt签证');
    const result = await this.validateUser(user.username, user.password);
    // console.log(result, 'result');
    // const result = await this.checkLogin(user);
    const payload = {
      id: result.id,
      username: result.username,
      roles: result.roles
    };
    // const payload = { id: user.id, username: user.username };

    return {
      message: '登录成功！',
      username: user.username,
      token: this.jwtService.sign(payload)
    };
  }

  // 校验token
  async verifyToken(token: string) {
    console.log('校验token');
    console.log(token, 'token');
    if (token) {
      const jwt = token.replace('Bearer', '');
      const id = this.jwtService.verify(jwt);
      return id;
    }
    throw new BusinessException('token不存在！');
  }
}
