import { Repository } from 'typeorm';
import { Fee } from './entities/fee.entity';
import { Payment } from './entities/payment.entity';
export declare class FinancialService {
    private feeRepository;
    private paymentRepository;
    constructor(feeRepository: Repository<Fee>, paymentRepository: Repository<Payment>);
    createFee(data: any, schoolId: string): Promise<Fee[]>;
    findAllFees(): Promise<Fee[]>;
    createPayment(data: any, schoolId: string): Promise<Payment[]>;
    findAllPayments(): Promise<Payment[]>;
    findPaymentsByStudent(studentId: string): Promise<Payment[]>;
}
