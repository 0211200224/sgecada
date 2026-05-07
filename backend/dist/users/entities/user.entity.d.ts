import { BaseEntity } from '../../shared/entities/base.entity';
import { School } from '../../tenants/entities/school.entity';
export declare enum UserRole {
    PLATFORM_ADMIN = "platform_admin",
    DIRECTOR = "director",
    PROFESSOR = "professor",
    STUDENT = "student"
}
export declare class User extends BaseEntity {
    email: string;
    password: string;
    role: UserRole;
    school_id: string;
    school: School;
    is_active: boolean;
}
