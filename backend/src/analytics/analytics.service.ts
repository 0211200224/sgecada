import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Grade } from '../pedagogical/entities/grade.entity';
import { Payment } from '../financial/entities/payment.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async getStudentRanking(classId: string) {
    const students = await this.studentRepository.find({
      where: { class_id: classId },
      relations: ['grades'],
    });

    const ranking = students.map(student => {
      const grades = student.grades || [];
      const avg = grades.length > 0 
        ? grades.reduce((sum, g) => sum + Number(g.value), 0) / grades.length 
        : 0;
      
      return {
        id: student.id,
        name: `${student.first_name} ${student.last_name}`,
        average: Number(avg.toFixed(2)),
      };
    });

    return ranking.sort((a, b) => b.average - a.average);
  }

  async getStudentsAtRisk() {
    const threshold = 10;
    
    const grades = await this.gradeRepository.find({ relations: ['student'] });
    
    const studentGrades = {};
    grades.forEach(g => {
      if (!studentGrades[g.student_id]) {
        studentGrades[g.student_id] = { sum: 0, count: 0, student: g.student };
      }
      studentGrades[g.student_id].sum += Number(g.value);
      studentGrades[g.student_id].count++;
    });

    return Object.values(studentGrades)
      .map((data: any) => ({
        name: `${data.student.first_name} ${data.student.last_name}`,
        average: data.sum / data.count,
      }))
      .filter(s => s.average < threshold);
  }

  async getFinancialSummary() {
    const payments = await this.paymentRepository.find();
    
    const totalCollected = payments.reduce((sum, p) => sum + Number(p.amount_paid), 0);
    const recentPayments = payments.slice(-5).reverse();

    return {
      totalCollected,
      paymentCount: payments.length,
      recentPayments,
    };
  }
}
