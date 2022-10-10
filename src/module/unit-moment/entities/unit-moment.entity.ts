import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class UnitMoment {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  unit_id: string;

  @Column()
  left_top: string;

  @Column()
  left_top_img: string;

  @Column()
  bottom_left: string;

  @Column()
  bottom_left_img: string;

  @Column()
  bottom_right: string;

  @Column()
  bottom_right_img: string;
  @Column()
  right_title: string;

  @Column()
  right_img: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
