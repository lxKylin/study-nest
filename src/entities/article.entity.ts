import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { Classify } from './classify.entity';

// @Entity()装饰器自动从所有类生成一个SQL表，以及他们包含的元数据
@Entity() // sql表名为article
export class Article {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  title: string;

  // @Column('json', { nullable: true }) json格式且可为空
  @Column({ length: 100 })
  author: string;

  @JoinTable({ name: 'article_classify' })
  @ManyToMany((type) => Classify, (classify) => classify.articles, {
    cascade: true
  })
  classify: Classify[];

  @Column('text', { nullable: true })
  image: string;

  @Column()
  isRecommend: boolean;

  @Column({ length: 255 })
  about: string;

  @Column('text')
  article: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
