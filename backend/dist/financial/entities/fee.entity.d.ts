import { TenantEntity } from '../../shared/entities/tenant.entity';
export declare class Fee extends TenantEntity {
    name: string;
    amount: number;
    frequency: string;
    is_active: boolean;
}
