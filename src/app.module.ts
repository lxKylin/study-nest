import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 环境配置相关
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT, // 来自process.env的每个值都是字符串，前面加+转数字
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true, // 自动加载模块
        // entities: [User],
        synchronize: true // 开启同步，生产中要禁止
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
