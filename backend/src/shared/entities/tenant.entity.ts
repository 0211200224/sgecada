import { Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class TenantEntity extends BaseEntity {
  @Index()
  @Column({ type: 'uuid' })
  school_id: string;
}
