import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fee } from './entities/fee.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  // Fees
  async createFee(data: any, schoolId: string) {
    const fee = this.feeRepository.create({
      ...data,
      school_id: schoolId,
    });
    return this.feeRepository.save(fee);
  }

  async findAllFees() {
    return this.feeRepository.find();
  }

  // Payments
  async createPayment(data: any, schoolId: string) {
    const payment = this.paymentRepository.create({
      ...data,
      school_id: schoolId,
    });
    return this.paymentRepository.save(payment);
  }

  async findAllPayments() {
    return this.paymentRepository.find({
      relations: ['student', 'fee'],
    });
  }

  async findPaymentsByStudent(studentId: string) {
    return this.paymentRepository.find({
      where: { student_id: studentId },
      relations: ['fee'],
    });
  }
}
