import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private configService: ConfigService) {}

  async sendEmail(to: string, subject: string, body: string) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    
    this.logger.log(`Sending email to ${to} with subject: ${subject}`);
    
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not configured. Email will only be logged.');
      return { status: 'mocked', to };
    }

    // In a real scenario:
    // await fetch('https://api.resend.com/emails', { ... });

    return { status: 'sent', to };
  }
}
