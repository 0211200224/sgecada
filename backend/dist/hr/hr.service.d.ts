import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Payroll } from './entities/payroll.entity';
export declare class HrService {
    private readonly employeeRepository;
    private readonly payrollRepository;
    constructor(employeeRepository: Repository<Employee>, payrollRepository: Repository<Payroll>);
    createEmployee(data: any, school_id: string): Promise<Employee>;
    findAllEmployees(school_id: string): Promise<Employee[]>;
    generateMonthlyPayroll(school_id: string, month: number, year: number): Promise<Payroll[]>;
    findAllPayrolls(school_id: string): Promise<Payroll[]>;
}
