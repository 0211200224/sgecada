import { HrService } from './hr.service';
export declare class HrController {
    private readonly hrService;
    constructor(hrService: HrService);
    createEmployee(data: any, req: any): Promise<import("./entities/employee.entity").Employee>;
    findAllEmployees(req: any): Promise<import("./entities/employee.entity").Employee[]>;
    generatePayroll(data: {
        month: number;
        year: number;
    }, req: any): Promise<import("./entities/payroll.entity").Payroll[]>;
    findAllPayrolls(req: any): Promise<import("./entities/payroll.entity").Payroll[]>;
}
