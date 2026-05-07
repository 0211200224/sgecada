import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { School } from '../tenants/entities/school.entity';
import { Student } from '../students/entities/student.entity';
import { Payment } from '../financial/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Student, Payment])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
