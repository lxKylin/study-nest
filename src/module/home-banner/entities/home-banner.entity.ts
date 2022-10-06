import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class HomeBanner {
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
