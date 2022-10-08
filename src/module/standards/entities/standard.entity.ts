import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Standard {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  title: string;

  // @Column('json', { nullable: true }) json格式且可为空
  @Column({ length: 100 })
  author: string;

  @Column({ length: 100 })
  classify: string;

  @Column('text', { nullable: true })
  image: string;

  @Column({ length: 255 })
  about: string;

  @Column('text')
  article: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
