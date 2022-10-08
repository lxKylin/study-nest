import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 环境配置相关
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { CommonModule } from './common/common.module';
import { AboutModule } from './module/about/about.module';
import { ArticleModule } from './module/article/article.module';
import { UploadModule } from './module/upload/upload.module';
import { PersonModule } from './module/person/person.module';
import { UnitModule } from './module/unit/unit.module';
import { DatasModule } from './module/datas/datas.module';
import { HomeAboutModule } from './module/home-about/home-about.module';
import { HomeBannerModule } from './module/home-banner/home-banner.module';
import { IntegralModule } from './module/integral/integral.module';
import { LivePreviewModule } from './module/live-preview/live-preview.module';
import { NewsBannerModule } from './module/news-banner/news-banner.module';
import { NoticeModule } from './module/notice/notice.module';
import { StandardsModule } from './module/standards/standards.module';
import { UnitDownloadModule } from './module/unit-download/unit-download.module';
import { UnitProductModule } from './module/unit-product/unit-product.module';

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
    }),
    AuthModule,
    CommonModule,
    AboutModule,
    ArticleModule,
    UploadModule,
    PersonModule,
    UnitModule,
    DatasModule,
    HomeAboutModule,
    HomeBannerModule,
    IntegralModule,
    LivePreviewModule,
    NewsBannerModule,
    NoticeModule,
    StandardsModule,
    UnitDownloadModule,
    UnitProductModule
  ],
  providers: [AppService]
})
export class AppModule {}
