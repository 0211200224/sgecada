import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  school_id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  position: string; // 'professor', 'admin', 'limpeza'

  @Column({ nullable: true })
  photo_url: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  base_salary: number;

  @Column({ type: 'date' })
  hire_date: Date;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
