import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginMiddleware } from '@/middleware/login.middleware';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { UserMiddleware } from '@/middleware/user.middleware';
import { HandlePasswordMiddleware } from '@/middleware/handlePassword.middleware';
import { UserService } from '@/services/user.service';
import { User } from '@/entities/user.entity';
import { Role } from '@/entities/role.entity';

import { AuthController } from '@/controllers/auth.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Role])],
  providers: [UserService]
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes() 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类
    // consumer.apply(LoginMiddleware).forRoutes(AuthController);
    consumer
      .apply(LoginMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'user/list', method: RequestMethod.GET });
    // consumer.apply(AuthMiddleware).forRoutes('*');
    consumer
      .apply(UserMiddleware, HandlePasswordMiddleware)
      .forRoutes({ path: 'user/create', method: RequestMethod.POST });
    consumer
      .apply(HandlePasswordMiddleware)
      .forRoutes({ path: 'user/list/:id', method: RequestMethod.PATCH });
    // consumer
    //   .apply(HandlePasswordMiddleware)
    //   .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
