import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { generateDocument } from './swagger';

async function bootstrap() {
  // 创建nest应用 （引入根模块）
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 创建swagger文档
  generateDocument(app);

  await app.listen(9527, () => {
    console.log(`项目运行在http:localhost:9527`);
  });
}
bootstrap();
