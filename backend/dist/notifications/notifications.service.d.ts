import { ConfigService } from '@nestjs/config';
export declare class NotificationsService {
    private configService;
    private resend;
    constructor(configService: ConfigService);
    sendWelcomeEmail(to: string, name: string, schoolName: string): Promise<import("resend").CreateEmailResponse>;
    sendPaymentConfirmation(to: string, amount: number, reference: string): Promise<import("resend").CreateEmailResponse>;
}
