import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY') || 're_mock_key');
  }

  async sendWelcomeEmail(to: string, name: string, schoolName: string) {
    return this.resend.emails.send({
      from: 'SGE-ERP <noreply@sgecada.edu>',
      to: [to],
      subject: `Bem-vindo à ${schoolName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; padding: 40px;">
          <h1 style="color: #10b981;">Bem-vindo, ${name}!</h1>
          <p>A tua matrícula na <strong>${schoolName}</strong> foi confirmada com sucesso no sistema SGE-ERP.</p>
          <p>Agora podes aceder ao portal do estudante para consultar as tuas notas e pagamentos.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">Este é um email automático, por favor não respondas.</p>
        </div>
      `,
    });
  }

  async sendPaymentConfirmation(to: string, amount: number, reference: string) {
    return this.resend.emails.send({
      from: 'Financeiro SGE <financeiro@sgecada.edu>',
      to: [to],
      subject: 'Confirmação de Pagamento Recebida',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; padding: 40px;">
          <h2 style="color: #10b981;">Pagamento Confirmado</h2>
          <p>Recebemos o teu pagamento no valor de <strong>${amount.toLocaleString()} MT</strong>.</p>
          <p>Referência da Transação: <code>${reference}</code></p>
          <p>O recibo oficial já está disponível no teu portal.</p>
        </div>
      `,
    });
  }
}
