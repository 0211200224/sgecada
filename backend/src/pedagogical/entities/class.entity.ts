import { Entity, Column } from 'typeorm';
import { TenantEntity } from '../../shared/entities/tenant.entity';

@Entity('classes')
export class SchoolClass extends TenantEntity {
  @Column()
  name: string;

  @Column()
  level: string; // e.g., '10', '11', '12'

  @Column()
  year: number;

  @Column({ default: true })
  is_active: boolean;
}
