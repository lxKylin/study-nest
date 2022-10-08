import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class UnitProduct {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  unit_id: string;

  @Column()
  logo: string;

  @Column()
  image: string;

  @Column({ length: 100 })
  abbreviation: string;

  @Column()
  name: boolean;

  @Column()
  about: string;

  @Column()
  link: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
