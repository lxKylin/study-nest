import { Entity } from 'typeorm';

import { BannerEntity } from './common-entity.entity';

@Entity()
export class HomeBanner extends BannerEntity {}
