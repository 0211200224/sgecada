import { ConfigurationService } from './configuration.service';
export declare class ConfigurationController {
    private readonly configService;
    constructor(configService: ConfigurationService);
    getConfig(req: any): Promise<import("./entities/configuration.entity").SchoolConfig>;
    updateConfig(req: any, data: any): Promise<import("./entities/configuration.entity").SchoolConfig>;
}
