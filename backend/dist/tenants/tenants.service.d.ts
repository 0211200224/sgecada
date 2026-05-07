import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
export declare class TenantsService {
    private schoolRepository;
    constructor(schoolRepository: Repository<School>);
    create(data: Partial<School>): Promise<School>;
    findBySubdomain(subdomain: string): Promise<School | null>;
    findById(id: string): Promise<School | null>;
}
