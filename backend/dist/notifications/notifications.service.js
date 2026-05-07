"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
const config_1 = require("@nestjs/config");
let NotificationsService = class NotificationsService {
    configService;
    resend;
    constructor(configService) {
        this.configService = configService;
        this.resend = new resend_1.Resend(this.configService.get('RESEND_API_KEY') || 're_mock_key');
    }
    async sendWelcomeEmail(to, name, schoolName) {
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
    async sendPaymentConfirmation(to, amount, reference) {
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
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map