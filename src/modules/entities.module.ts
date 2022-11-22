import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { About } from '@/entities/about.entity';
import { Article } from '@/entities/article.entity';
import { Data } from '@/entities/data.entity';
import { HomeAbout } from '@/entities/home-about.entity';
import { HomeBanner } from '@/entities/home-banner.entity';
import { Integral } from '@/entities/integral.entity';
import { LivePreview } from '@/entities/live-preview.entity';
import { NewsBanner } from '@/entities/news-banner.entity';
import { Notice } from '@/entities/notice.entity';
import { Person } from '@/entities/person.entity';
import { Standard } from '@/entities/standard.entity';
import { Unit } from '@/entities/unit.entity';
import { UnitAll } from '@/entities/unit-all.entity';
import { UnitDownload } from '@/entities/unit-download.entity';
import { UnitMoment } from '@/entities/unit-moment.entity';
import { UnitProduct } from '@/entities/unit-product.entity';
import { UnitSolution } from '@/entities/unit-solution.entity';
import { Picture } from '@/entities/picture.entity';
import { File } from '@/entities/file.entity';
import { Classify } from '@/entities/classify.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      About,
      Article,
      Data,
      HomeAbout,
      HomeBanner,
      Integral,
      LivePreview,
      NewsBanner,
      Notice,
      Person,
      Standard,
      Unit,
      UnitAll,
      UnitDownload,
      UnitMoment,
      UnitProduct,
      UnitSolution,
      Picture,
      File,
      Classify
    ])
  ],
  exports: [TypeOrmModule]
})
export class EntitiesModule {}
