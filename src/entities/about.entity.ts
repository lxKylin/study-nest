import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

// @Entity()装饰器自动从所有类生成一个SQL表，以及他们包含的元数据
// @Entity('users') // sql表名为users
@Entity() // sql表名为user
export class About {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column({ length: 100 })
  classify: string;

  // @Column('json', { nullable: true }) json格式且可为空
  @Column({ length: 100 })
  name: string;

  @Column('text')
  text: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
