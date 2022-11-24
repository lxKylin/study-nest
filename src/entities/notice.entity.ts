import { Entity } from 'typeorm';

import { CommonEntity } from './common-entity.entity';
@Entity()
export class Notice extends CommonEntity {}
