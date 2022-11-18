import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class UnitAll {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  unit_id: string;

  @Column({ length: 100 })
  classify: string;

  @Column()
  logo: string;

  @Column({ nullable: true })
  detail_logo: string;

  @Column({ length: 100 })
  company: string;

  @Column({ length: 100, nullable: true })
  for_short: string;

  @Column({ length: 100, nullable: true })
  honor: string;

  @Column()
  web: string;

  @Column({ length: 100, nullable: true })
  slogan: string;

  @Column({ nullable: true })
  slogan_img: string;

  @Column()
  about: string;

  @Column({ nullable: true })
  home_about: string;

  @Column({ nullable: true })
  data_link: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  isRecommend: boolean;

  @Column({ nullable: true })
  home_img: string;

  @Column({ nullable: true })
  banner_img: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
