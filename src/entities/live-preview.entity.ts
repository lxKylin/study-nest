import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class LivePreview {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  dates: string;

  // @Column('json', { nullable: true }) json格式且可为空
  @Column({ length: 100 })
  time: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  about: string;

  @Column()
  isPredict: boolean;

  @Column('text', { nullable: true })
  image: string;

  @Column({ length: 255 })
  image_preview: string;

  @Column('text')
  link: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
