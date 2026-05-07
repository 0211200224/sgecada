import { TenantEntity } from '../../shared/entities/tenant.entity';
import { User } from '../../users/entities/user.entity';
import { SchoolClass } from '../../pedagogical/entities/class.entity';
import { Grade } from '../../pedagogical/entities/grade.entity';
export declare class Student extends TenantEntity {
    first_name: string;
    last_name: string;
    enrollment_number: string;
    photo_url: string;
    birth_date: Date;
    user: User;
    user_id: string;
    current_class: SchoolClass;
    class_id: string;
    grades: Grade[];
}
