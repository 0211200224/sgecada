import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { School } from '../../tenants/entities/school.entity';

export enum UserRole {
  PLATFORM_ADMIN = 'platform_admin',
  DIRECTOR = 'director',
  PROFESSOR = 'professor',
  STUDENT = 'student',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ type: 'uuid', nullable: true }) // Nullable only for PlatformAdmin if global
  school_id: string;

  @ManyToOne(() => School)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ default: true })
  is_active: boolean;
}
