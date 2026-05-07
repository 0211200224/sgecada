import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity('schools')
export class School extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  subdomain: string;

  @Column({ nullable: true })
  logo_url?: string;

  @Column({ default: true })
  is_active: boolean;
}
