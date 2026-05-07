import { Entity, Column } from 'typeorm';
import { TenantEntity } from '../../shared/entities/tenant.entity';

@Entity('fees')
export class Fee extends TenantEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ default: 'monthly' })
  frequency: string; // 'once', 'monthly', 'annual'

  @Column({ default: true })
  is_active: boolean;
}
