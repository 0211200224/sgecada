import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Payroll } from './entities/payroll.entity';

@Injectable()
export class HrService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
  ) {}

  async createEmployee(data: any, school_id: string): Promise<Employee> {
    return await this.employeeRepository.save({ ...data, school_id } as any);
  }

  async findAllEmployees(school_id: string): Promise<Employee[]> {
    return this.employeeRepository.find({ where: { school_id } });
  }

  async generateMonthlyPayroll(school_id: string, month: number, year: number) {
    const employees = await this.employeeRepository.find({ where: { school_id, status: 'active' } });
    
    const payrolls = employees.map(emp => {
      const gross = Number(emp.base_salary);
      const bonus = 0; // Poderia vir de lógica adicional
      const deductions = 0; // Poderia vir de faltas
      const net = gross + bonus - deductions;

      return this.payrollRepository.create({
        school_id,
        employee: emp,
        month,
        year,
        gross_salary: gross,
        bonus,
        deductions,
        net_salary: net,
        status: 'pending'
      });
    });

    return this.payrollRepository.save(payrolls);
  }

  async findAllPayrolls(school_id: string): Promise<Payroll[]> {
    return this.payrollRepository.find({ 
      where: { school_id },
      relations: ['employee'],
      order: { created_at: 'DESC' }
    });
  }
}
