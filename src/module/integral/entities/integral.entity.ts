import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Integral {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  company: string;

  @Column()
  integral: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
