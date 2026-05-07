import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolClass } from './entities/class.entity';
import { Grade } from './entities/grade.entity';

@Injectable()
export class PedagogicalService {
  constructor(
    @InjectRepository(SchoolClass)
    private classRepository: Repository<SchoolClass>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  // Classes
  async createClass(data: any, schoolId: string) {
    const schoolClass = this.classRepository.create({
      ...data,
      school_id: schoolId,
    });
    return this.classRepository.save(schoolClass);
  }

  async findAllClasses() {
    return this.classRepository.find();
  }

  // Grades
  async createGrade(data: any, schoolId: string) {
    const grade = this.gradeRepository.create({
      ...data,
      school_id: schoolId,
    });
    return this.gradeRepository.save(grade);
  }

  async findGradesByStudent(studentId: string) {
    return this.gradeRepository.find({
      where: { student_id: studentId },
      relations: ['student', 'school_class'],
    });
  }
}
