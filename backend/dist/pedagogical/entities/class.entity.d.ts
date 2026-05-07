import { TenantEntity } from '../../shared/entities/tenant.entity';
export declare class SchoolClass extends TenantEntity {
    name: string;
    level: string;
    year: number;
    is_active: boolean;
}
