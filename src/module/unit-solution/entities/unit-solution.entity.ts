import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class UnitSolution {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  unit_id: string;

  @Column('text', { nullable: true })
  image: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255 })
  about: string;

  @Column({ length: 255 })
  link: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
