import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginMiddleware } from '@/middleware/login.middleware';
import { UserMiddleware } from '@/middleware/user.middleware';
import { UserService } from '@/user/user.service';
import { User } from '@/user/entities/user.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserService]
})
export class CommonModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    // 将中间件绑定到以user为前缀的路由
    await consumer
      .apply(LoginMiddleware)
      .forRoutes({ path: 'auth', method: RequestMethod.POST });
    await consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
