import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { generateDocument } from './swagger';

async function bootstrap() {
  // 创建nest应用 （引入根模块）
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 统一响应体格式 useGlobalInterceptors 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器 useGlobalFilters 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 创建swagger文档
  generateDocument(app);

  await app.listen(9527, () => {
    console.log(`项目运行在http:localhost:9527/api`);
  });
}
bootstrap();
