import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { Employee } from './entities/employee.entity';
import { Payroll } from './entities/payroll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Payroll])],
  providers: [HrService],
  controllers: [HrController],
  exports: [HrService],
})
export class HrModule {}
