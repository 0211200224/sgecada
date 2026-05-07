import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TenantEntity } from '../../shared/entities/tenant.entity';
import { Student } from '../../students/entities/student.entity';
import { Fee } from './fee.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}

@Entity('payments')
export class Payment extends TenantEntity {
  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ type: 'uuid' })
  student_id: string;

  @ManyToOne(() => Fee)
  @JoinColumn({ name: 'fee_id' })
  fee: Fee;

  @Column({ type: 'uuid' })
  fee_id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount_paid: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PAID
  })
  status: PaymentStatus;

  @Column({ nullable: true })
  receipt_url: string;
}
