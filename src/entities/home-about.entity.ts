import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class HomeAbout {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 255 })
  about: string;

  // @Column('json', { nullable: true }) json格式且可为空
  @Column({ length: 255 })
  image: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  login: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
