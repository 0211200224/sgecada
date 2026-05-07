import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('payrolls')
export class Payroll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  school_id: string;

  @ManyToOne(() => Employee)
  employee: Employee;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  gross_salary: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  deductions: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  bonus: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  net_salary: number;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'paid'

  @CreateDateColumn()
  created_at: Date;
}
