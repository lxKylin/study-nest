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

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserService]
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginMiddleware)
      .forRoutes({ path: 'auth', method: RequestMethod.POST });
    consumer
      .apply(UserMiddleware, HandlePasswordMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
    consumer
      .apply(HandlePasswordMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.PATCH }, 'user/(.*)');
  }
}
