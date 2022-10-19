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
import { HandlePasswordMiddleware } from '@/middleware/handlePassword.middleware';
import { UserService } from '@/module/user/user.service';
import { User } from '@/module/user/entities/user.entity';

import { AuthController } from '@/module/auth/auth.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserService]
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes() 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类
    consumer.apply(LoginMiddleware).forRoutes(AuthController);
    // consumer
    //   .apply(LoginMiddleware)
    //   .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(UserMiddleware, HandlePasswordMiddleware)
      .forRoutes({ path: 'user/:id', method: RequestMethod.POST });
    consumer
      .apply(HandlePasswordMiddleware)
      .forRoutes({ path: 'user/:id', method: RequestMethod.PATCH });
  }
}
