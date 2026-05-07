import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Student } from '../students/entities/student.entity';
import { Grade } from '../pedagogical/entities/grade.entity';
import { Payment } from '../financial/entities/payment.entity';
import { SchoolClass } from '../pedagogical/entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Grade, Payment, SchoolClass]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
