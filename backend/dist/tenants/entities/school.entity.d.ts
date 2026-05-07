import { BaseEntity } from '../../shared/entities/base.entity';
export declare class School extends BaseEntity {
    name: string;
    subdomain: string;
    logo_url?: string;
    is_active: boolean;
}
