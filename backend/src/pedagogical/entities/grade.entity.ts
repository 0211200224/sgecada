import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TenantEntity } from '../../shared/entities/tenant.entity';
import { Student } from '../../students/entities/student.entity';
import { SchoolClass } from './class.entity';

@Entity('grades')
export class Grade extends TenantEntity {
  @Column()
  subject: string; // e.g., 'Matemática'

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number;

  @Column()
  period: string; // e.g., '1st Quarter', 'Final Exam'

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ type: 'uuid' })
  student_id: string;

  @ManyToOne(() => SchoolClass)
  @JoinColumn({ name: 'class_id' })
  school_class: SchoolClass;

  @Column({ type: 'uuid' })
  class_id: string;
}
