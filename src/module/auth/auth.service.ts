import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

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

  // 验证用户是否存在
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);
    if (user && user.password === md5password(pass)) {
      // const { password, ...result } = user;
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

  async login(user: any) {
    const result = await this.validateUser(user.username, user.password);
    // const result = await this.checkLogin(user);
    const payload = { id: result.id, username: result.username };
    // const payload = { id: user.id, username: user.username };
    console.log(payload);

    return {
      message: '登录成功！',
      token: this.jwtService.sign(payload)
    };
  }
}
