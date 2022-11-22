import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/modules/app.module';

import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { generateDocument } from './swagger';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 创建nest应用 （引入根模块）
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
  // path.join(__dirname, '../public/picture')
  app.useStaticAssets('public', {
    prefix: '/api/upload/public'
  });

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 统一响应体格式 useGlobalInterceptors 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器 useGlobalFilters 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 全局应用管道 对输入数据进行转换或者验证
  app.useGlobalPipes(new ValidationPipe());

  // 创建swagger文档
  generateDocument(app);

  await app.listen(+process.env.SERVICE_PORT, () => {
    console.log(`项目运行在http:localhost:${process.env.SERVICE_PORT}/api`);
  });
}
bootstrap();
