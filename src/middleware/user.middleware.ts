import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';
import { UserService } from '@/module/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BusinessException('用户名或密码不能为空');
    }

    const result = await this.userService.findOneByUserName(username);
    if (result) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_ALREADY_EXISTS,
        message: '用户已存在！'
      });
    }
    next();
  }
}
