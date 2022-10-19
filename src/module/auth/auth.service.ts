import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '@/module/user/user.service';
import { md5password } from '@/utils/password-handle';
import { BusinessException } from '@/common/exceptions/business.exception';
import { CreateUserDto } from '@/module/user/dto/create-user.dto';
import { User } from '@/module/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  // 验证用户是否存在
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);
    if (user && user.password === md5password(password)) {
      return user;
    }
    throw new BusinessException('用户名或密码错误');
  }

  async checkLogin(loginBody: CreateUserDto) {
    const { username, password } = loginBody;
    const user = await this.userRepository.findOne({ where: { username } });
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
    const result = await this.validateUser(user.username, user.password);
    // const result = await this.checkLogin(user);
    const payload = { id: result.id, username: result.username };
    // const payload = { id: user.id, username: user.username };

    return {
      message: '登录成功！',
      username: user.username,
      token: this.jwtService.sign(payload)
    };
  }

  // 校验token
  async verifyToken(token: string) {
    if (token) {
      const jwt = token.replace('Bearer', '');
      const id = this.jwtService.verify(jwt);
      return id;
    }
    throw new BusinessException('token不存在！');
  }
}
