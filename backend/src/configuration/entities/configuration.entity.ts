import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_configurations')
export class SchoolConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  school_id: string;

  @Column({ default: '0-20' })
  grading_system: string; // '0-20', 'A-F', '0-100'

  @Column({ default: 'trimestral' })
  academic_period: string; // 'trimestral', 'semestral'

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 10.0 })
  passing_grade: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 5.0 })
  late_fee_percentage: number;

  @Column({ default: 'MT' })
  currency: string;

  @Column({ type: 'jsonb', nullable: true })
  branding: {
    primary_color: string;
    logo_url: string;
  };

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
