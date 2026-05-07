import { TenantEntity } from '../../shared/entities/tenant.entity';
import { Student } from '../../students/entities/student.entity';
import { Fee } from './fee.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    CANCELLED = "cancelled"
}
export declare class Payment extends TenantEntity {
    student: Student;
    student_id: string;
    fee: Fee;
    fee_id: string;
    amount_paid: number;
    payment_date: Date;
    status: PaymentStatus;
    receipt_url: string;
}
