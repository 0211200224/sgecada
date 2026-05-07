import { ConfigService } from '@nestjs/config';
export declare class NotificationService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, body: string): Promise<{
        status: string;
        to: string;
    }>;
}
