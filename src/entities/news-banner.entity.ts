import { Entity } from 'typeorm';

import { BannerEntity } from './common-entity.entity';

@Entity()
export class NewsBanner extends BannerEntity {}
