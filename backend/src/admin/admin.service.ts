import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from '../tenants/entities/school.entity';
import { Student } from '../students/entities/student.entity';
import { Payment } from '../financial/entities/payment.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async getGlobalStats() {
    const schoolsCount = await this.schoolRepo.count();
    const studentsCount = await this.studentRepo.count();
    const payments = await this.paymentRepo.find();
    const totalRevenue = payments.reduce((acc, curr) => acc + Number(curr.amount_paid), 0);

    return {
      schoolsCount,
      studentsCount,
      totalRevenue,
      activeTenants: schoolsCount
    };
  }

  async getAllSchools() {
    return this.schoolRepo.find({ order: { created_at: 'DESC' } });
  }
}
