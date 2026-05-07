import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private usersService: UsersService,
  ) {}

  async create(data: any, schoolId: string) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Create User first
    const hashedPassword = await bcrypt.hash(data.password || 'estudante123', 10);
    const user = await this.usersService.create({
      email: data.email,
      password: hashedPassword,
      role: UserRole.STUDENT,
      school_id: schoolId,
    });

    // Create Student
    const student = this.studentRepository.create({
      first_name: data.firstName,
      last_name: data.lastName,
      enrollment_number: data.enrollmentNumber,
      birth_date: data.birthDate,
      user_id: user.id,
      school_id: schoolId,
      class_id: data.classId,
    });

    return this.studentRepository.save(student);
  }

  async findAll() {
    return this.studentRepository.find({
      relations: ['user', 'current_class'],
    });
  }

  async findOne(id: string) {
    return this.studentRepository.findOne({
      where: { id },
      relations: ['user', 'current_class'],
    });
  }
}
