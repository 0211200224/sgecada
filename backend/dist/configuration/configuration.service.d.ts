import { Repository } from 'typeorm';
import { SchoolConfig } from './entities/configuration.entity';
export declare class ConfigurationService {
    private readonly configRepository;
    constructor(configRepository: Repository<SchoolConfig>);
    getConfig(school_id: string): Promise<SchoolConfig>;
    updateConfig(school_id: string, data: Partial<SchoolConfig>): Promise<SchoolConfig>;
}
