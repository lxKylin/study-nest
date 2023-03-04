import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Role } from './role.entity';

// @Entity()装饰器自动从所有类生成一个SQL表，以及他们包含的元数据
// @Entity('users') // sql表名为users
@Entity() // sql表名为user
export class User {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column()
  username: string;

  // 请求返回数据时将密码这个字段隐藏
  @Exclude()
  // @Column('json', { nullable: true }) json格式且可为空
  @Column()
  password: string;

  // 定义与其他表的关系
  // name 用于指定创中间表的表名
  // JoinTable只在关系一边
  @JoinTable({ name: 'user_roles' })
  // 指定多对多关系
  /**
   * 关系类型，返回相关实体引用
   * cascade: true，插入和更新启用级联，也可设置为仅插入或仅更新
   * ['insert']
   */
  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  roles: Role[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
