import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { md5password } from '@/utils/password-handle';

@Injectable()
export class HandlePasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    req.body.password = md5password(password);
    next();
  }
}
