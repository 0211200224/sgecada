import { TenantEntity } from '../../shared/entities/tenant.entity';
import { Student } from '../../students/entities/student.entity';
import { SchoolClass } from './class.entity';
export declare class Grade extends TenantEntity {
    subject: string;
    value: number;
    period: string;
    student: Student;
    student_id: string;
    school_class: SchoolClass;
    class_id: string;
}
