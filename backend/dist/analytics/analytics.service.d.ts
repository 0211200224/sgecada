import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Grade } from '../pedagogical/entities/grade.entity';
import { Payment } from '../financial/entities/payment.entity';
export declare class AnalyticsService {
    private studentRepository;
    private gradeRepository;
    private paymentRepository;
    constructor(studentRepository: Repository<Student>, gradeRepository: Repository<Grade>, paymentRepository: Repository<Payment>);
    getStudentRanking(classId: string): Promise<{
        id: string;
        name: string;
        average: number;
    }[]>;
    getStudentsAtRisk(): Promise<{
        name: string;
        average: number;
    }[]>;
    getFinancialSummary(): Promise<{
        totalCollected: number;
        paymentCount: number;
        recentPayments: Payment[];
    }>;
}
