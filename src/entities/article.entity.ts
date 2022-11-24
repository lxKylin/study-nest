import { Entity, JoinTable, ManyToMany } from 'typeorm';

import { CommonEntity } from './common-entity.entity';
import { Classify } from './classify.entity';

// @Entity()装饰器自动从所有类生成一个SQL表，以及他们包含的元数据
@Entity() // sql表名为article
// 实体继承
export class Article extends CommonEntity {
  @JoinTable({ name: 'article_classify' })
  @ManyToMany((type) => Classify, (classify) => classify.articles, {
    cascade: true
  })
  classify: Classify[];
}
