import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

// 设置公共实体，减少重复代码
export class CommonEntity {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  title: string;

  // // @Column('json', { nullable: true }) json格式且可为空
  @Column({ length: 100 })
  author: string;

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

export class BannerEntity {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  image: string;

  @Column({ length: 100 })
  alt: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
