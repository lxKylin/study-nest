import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 环境配置相关
import { ConfigModule } from '@nestjs/config';

import * as path from 'path';

import { AboutController } from '@/controllers/about.controller';
import { AboutService } from '@/services/about.service';
import { ArticleController } from '@/controllers/article.controller';
import { ArticleService } from '@/services/article.service';
import { DatasController } from '@/controllers/datas.controller';
import { DatasService } from '@/services/datas.service';
import { HomeAboutService } from '@/services/home-about.service';
import { HomeAboutController } from '@/controllers/home-about.controller';
import { HomeBannerService } from '@/services/home-banner.service';
import { HomeBannerController } from '@/controllers/home-banner.controller';
import { IntegralService } from '@/services/integral.service';
import { IntegralController } from '@/controllers/integral.controller';
import { LivePreviewService } from '@/services/live-preview.service';
import { LivePreviewController } from '@/controllers/live-preview.controller';
import { NewsBannerService } from '@/services/news-banner.service';
import { NewsBannerController } from '@/controllers/news-banner.controller';
import { NoticeService } from '@/services/notice.service';
import { NoticeController } from '@/controllers/notice.controller';
import { PersonService } from '@/services/person.service';
import { PersonController } from '@/controllers/person.controller';
import { StandardsService } from '@/services/standards.service';
import { StandardsController } from '@/controllers/standards.controller';
import { UnitAllService } from '@/services/unit-all.service';
import { UnitAllController } from '@/controllers/unit-all.controller';
import { UnitDownloadService } from '@/services/unit-download.service';
import { UnitDownloadController } from '@/controllers/unit-download.controller';
import { UnitMomentService } from '@/services/unit-moment.service';
import { UnitMomentController } from '@/controllers/unit-moment.controller';
import { UnitProductService } from '@/services/unit-product.service';
import { UnitProductController } from '@/controllers/unit-product.controller';
import { UnitSolutionService } from '@/services/unit-solution.service';
import { UnitSolutionController } from '@/controllers/unit-solution.controller';
import { UploadService } from '@/services/upload.service';
import { UploadController } from '@/controllers/upload.controller';

import { UserModule } from '@/modules/user.module';
import { AuthModule } from '@/modules/auth.module';
import { CommonModule } from '@/modules/common.module';
import { EntitiesModule } from '@/modules/entities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT, // 来自process.env的每个值都是字符串，前面加+转数字
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true, // 自动加载模块 推荐
        // entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')], // 不推荐
        synchronize: true // 开启同步，生产中要禁止
      })
    }),
    UserModule,
    AuthModule,
    CommonModule,
    EntitiesModule
  ],
  controllers: [
    AboutController,
    ArticleController,
    DatasController,
    HomeAboutController,
    HomeBannerController,
    IntegralController,
    LivePreviewController,
    NewsBannerController,
    NoticeController,
    PersonController,
    StandardsController,
    UnitAllController,
    UnitDownloadController,
    UnitMomentController,
    UnitProductController,
    UnitSolutionController,
    UploadController
  ],
  providers: [
    AboutService,
    ArticleService,
    DatasService,
    HomeAboutService,
    HomeBannerService,
    IntegralService,
    LivePreviewService,
    NewsBannerService,
    NoticeService,
    PersonService,
    StandardsService,
    UnitAllService,
    UnitDownloadService,
    UnitMomentService,
    UnitProductService,
    UnitSolutionService,
    UploadService
  ]
})
export class AppModule {}
