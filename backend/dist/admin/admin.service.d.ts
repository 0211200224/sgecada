import { Repository } from 'typeorm';
import { School } from '../tenants/entities/school.entity';
import { Student } from '../students/entities/student.entity';
import { Payment } from '../financial/entities/payment.entity';
export declare class AdminService {
    private readonly schoolRepo;
    private readonly studentRepo;
    private readonly paymentRepo;
    constructor(schoolRepo: Repository<School>, studentRepo: Repository<Student>, paymentRepo: Repository<Payment>);
    getGlobalStats(): Promise<{
        schoolsCount: number;
        studentsCount: number;
        totalRevenue: number;
        activeTenants: number;
    }>;
    getAllSchools(): Promise<School[]>;
}
