import { Entity, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TenantEntity } from '../../shared/entities/tenant.entity';
import { User } from '../../users/entities/user.entity';
import { SchoolClass } from '../../pedagogical/entities/class.entity';
import { Grade } from '../../pedagogical/entities/grade.entity';

@Entity('students')
export class Student extends TenantEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  enrollment_number: string;

  @Column({ nullable: true })
  photo_url: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => SchoolClass)
  @JoinColumn({ name: 'class_id' })
  current_class: SchoolClass;

  @Column({ type: 'uuid', nullable: true })
  class_id: string;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}
