import { Employee } from './employee.entity';
export declare class Payroll {
    id: string;
    school_id: string;
    employee: Employee;
    month: number;
    year: number;
    gross_salary: number;
    deductions: number;
    bonus: number;
    net_salary: number;
    status: string;
    created_at: Date;
}
