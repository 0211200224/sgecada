import { FinancialService } from './financial.service';
export declare class FinancialController {
    private readonly financialService;
    constructor(financialService: FinancialService);
    createFee(data: any, req: any): Promise<import("./entities/fee.entity").Fee[]>;
    findAllFees(): Promise<import("./entities/fee.entity").Fee[]>;
    createPayment(data: any, req: any): Promise<import("./entities/payment.entity").Payment[]>;
    findAllPayments(): Promise<import("./entities/payment.entity").Payment[]>;
    findPaymentsByStudent(studentId: string): Promise<import("./entities/payment.entity").Payment[]>;
}
