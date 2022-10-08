import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Picture {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  filename: string;

  @Column({ length: 100, nullable: true })
  mimetype: string;

  @Column({ length: 255, nullable: true })
  path: string;

  @Column({ nullable: true })
  size: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
